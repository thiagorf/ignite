import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/user";
import { IUserRepositories } from "../../../repositories/implementations/IUsersRepositories"


class UserRepositories implements IUserRepositories{

	//Colocar o nome de todos os repositorios assim?
	private repositories: Repository<User> 

	constructor() {
		this.repositories = getRepository(User);
	}

	async create({name, password, email, driver_license, id, avatar}: ICreateUserDTO): Promise<void>
	{
		const user = this.repositories.create({
			name,
			password,
			email,
			driver_license,
			id,
			avatar
		});

		await this.repositories.save(user);
	}

	async findByEmail(email: string): Promise<User>
	{
		const user = await this.repositories.findOne({email});

		return user;
	}

	async findById(id: string) {
		const user = await this.repositories.findOne(id);

		return user;
	}
}

export { UserRepositories }