import { inject, injectable } from "tsyringe"
import jwt from 'jsonwebtoken';
import { IUserRepositories } from "@modules/accounts/repositories/implementations/IUsersRepositories"
import { compare } from "bcrypt";
import { AppError } from "@shared/errors/appError";
import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


interface IAuthenticateRequest {
	email: string;
	password: string
}

interface IResponse {
	user: {
		name: string;
		email: string
	};
	token: string,
	refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

	constructor(
		@inject("UserRepositories") 
		private repositories: IUserRepositories,
		@inject("UsersTokensRepositories")
		private userTokensRepositories: IUsersTokensRepositories,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	){}

	async execute({ email, password }: IAuthenticateRequest): Promise<IResponse>
	{
		const user = await this.repositories.findByEmail(email)

		if(!user) {
			throw new AppError("Email or password incorrets")
		}

		const passwordMatch = await compare(password, user.password);

		if(!passwordMatch) {
			throw new AppError("Email or password incorrects!");
		}

		const token = jwt.sign({}, auth.secret_token, {
			subject: user.id, 
			expiresIn: auth.expires_in_token
		});

		const refresh_token = jwt.sign({email}, auth.secret_refresh_token, {
			subject: user.id,
			expiresIn: auth.expires_in_resfresh_token
		})		

		const expires_date = this.dateProvider.addDays(auth.expires_resfresh_token_days)

		await this.userTokensRepositories.create({
			user_id: user.id,
			refresh_token,
			expires_date
		})

		const tokenReturn: IResponse = {
			token,
			refresh_token,
			user: {
				name: user.name,
				email: user.email
			}
		}

		return tokenReturn;

		
	}	
}

export { AuthenticateUserUseCase }
