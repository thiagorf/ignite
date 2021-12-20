import { inject, injectable } from "tsyringe"
import jwt from 'jsonwebtoken';
import { IUserRepositories } from "../../repositories/implementations/IUsersRepositories"
import { compare } from "bcrypt";
import { AppError } from "../../../../erros/appError";


interface IAuthenticateRequest {
	email: string;
	password: string
}

interface IResponse {
	user: {
		name: string;
		email: string
	};
	token: string
}

@injectable()
class AuthenticateUserUseCase {

	constructor(@inject("UserRepositories") private repositories: IUserRepositories) {}

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

		const token = jwt.sign({email},"secret", {subject: user.id, expiresIn: "1d"});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		}

		return tokenReturn;

		
	}	
}

export { AuthenticateUserUseCase }
