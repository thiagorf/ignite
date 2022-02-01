import { IUserRepositories } from "@modules/accounts/repositories/implementations/IUsersRepositories";
import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";


@injectable()
class ResetPasswordUseCase {

	constructor(
		@inject("UsersTokensRepositories")
		private userTokens: IUsersTokensRepositories,
		@inject("UserRepositories")
		private userRepositories: IUserRepositories,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute(token: string, password: string) {
		const emailToken = await this.userTokens.findByToken(token);
		
		if(!emailToken) {
			throw new AppError("Invalid token!");
		}

		if(this.dateProvider.checkExpiresDate(
			emailToken.expires_date, 
			this.dateProvider.dateNow())
			) {
				throw new AppError("Invalid token")
		}



		const user = await this.userRepositories.findById(emailToken.user_id);

		if(!user) {
			throw new AppError("User don't exists!")
		}

		const hashPassword = await hash(password, 8);

		user.password = hashPassword

		await this.userRepositories.create(user);

		await this.userTokens.deleteById(emailToken.id)
	}
}

export { ResetPasswordUseCase }