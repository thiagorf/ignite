import { IUserRepositories } from "@modules/accounts/repositories/implementations/IUsersRepositories";
import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailprovider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

@injectable()
class SendForgetPasswordMailUseCase {

	constructor(
		@inject("UserRepositories")
		private userRepositories: IUserRepositories,
		@inject("UsersTokensRepositories")
		private tokenRepositories: IUsersTokensRepositories,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("EtherealMailProvider")
		private mailProvider: IMailProvider
	) {}

	async execute(email: string) {
		const user = await this.userRepositories.findByEmail(email)

		const templatePath = resolve(__dirname, "..", "..", "views", "emails", "ForgetPassword.hbs")

		if(!user) {
			throw new AppError("User does not exists")
		}

		const token = uuidv4()

		const expires_date = this.dateProvider.addHours(3)

		await this.tokenRepositories.create({
			refresh_token: token,
			user_id: user.id,
			expires_date
		});

		const variables = {
			name: user.name,
			link: `${process.env.FORGOT_MAIL_URL}${token}`
		}


		await this.mailProvider.sendMail(
			email, 
			"Recuperação de senha",
			variables,
			templatePath	
		)
	}
}

export { SendForgetPasswordMailUseCase }