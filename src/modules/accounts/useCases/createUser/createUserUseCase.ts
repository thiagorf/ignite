import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepositories } from "../../repositories/implementations/IUsersRepositories";
import { hash } from 'bcrypt';
import { AppError } from "../../../../erros/appError";

@injectable()
class CreateUserUseCase {
	
	constructor(@inject("UserRepositories") private repositories: IUserRepositories) {}

	async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void>
	{
		const userEmailAlreadyExists = await this.repositories.findByEmail(email);

		if(userEmailAlreadyExists) {
			throw new AppError("Email already used!!")
		}


		const passrwordHash = await hash(password, 8);

		await this.repositories.create({
			name,
			password: passrwordHash,
			email,
			driver_license
		});
	}
}

export { CreateUserUseCase } 
 