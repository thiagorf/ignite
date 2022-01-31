import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken"
import auth from "@config/auth";
import { AppError } from "@shared/errors/appError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
	sub: string;
	email: string;
}

interface ITokenResponse {
	token: string;
	refresh_token: string
}

@injectable()
class RefreshTokenUseCase {

	constructor(
		@inject("UsersTokensRepositories")
		private repositories: IUsersTokensRepositories,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	){}

	async execute(token: string): Promise<ITokenResponse> {
		const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

		const user_id = sub;

		const userToken = await this.repositories.findByUserIdAndToken(user_id, token);

		if(!userToken) {
			throw new AppError("Refresh Token does not exists")
		}

		await this.repositories.deleteById(userToken.id);

		const newRefreshToken = sign({email}, auth.secret_refresh_token, {
			subject: user_id,
			expiresIn: auth.expires_in_resfresh_token
		})

		const expires_date = this.dateProvider.addDays(auth.expires_resfresh_token_days)

		await this.repositories.create({
			user_id,
			refresh_token: newRefreshToken,
			expires_date
		})

		const newAccessToken = sign({}, auth.secret_token, {
			subject: user_id,
			expiresIn: auth.expires_in_token
		})

		return {
			token: newAccessToken,
			refresh_token: newRefreshToken
			
		};
	}
}

export { RefreshTokenUseCase }