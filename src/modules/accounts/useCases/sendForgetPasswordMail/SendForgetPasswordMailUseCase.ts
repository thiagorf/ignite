import { IUserRepositories } from "@modules/accounts/repositories/implementations/IUsersRepositories";
import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";


@injectable()
class SendForgetPasswordMailUseCase {

	constructor(
		@inject("UsersRepositories")
		private userRepositories: IUserRepositories,
		@inject("UsersTokensRepositories")
		private tokenRepositories: IUsersTokensRepositories,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute(email: string) {
		const user = await this.userRepositories.findByEmail(email)

		if(!user) {
			throw new AppError("User does not exists")
		}

		const token = uuidv4()

		const expires_date = this.dateProvider.addHours(3)

		await this.tokenRepositories.create({
			refresh_token: token,
			user_id: user.id,
			expires_date
		})
	}
}

export { SendForgetPasswordMailUseCase }