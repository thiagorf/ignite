import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/user";
import { IUserRepositories } from "../implementations/IUsersRepositories";



class UserRepositoriesInMemory implements IUserRepositories {

	users: User[] = [];

	async create(data: ICreateUserDTO): Promise<User> {

		const { name, email, password, driver_license} = data;

		const user = new User();

		Object.assign(user, {
			name,
			email,
			password,
			driver_license
		});

		this.users.push(user);

		return user;

	}

	async findByEmail(email: string): Promise<User> {
		const user = this.users.find(user => user.email === email);

		return user;
	}

	async findById(user_id: string): Promise<User> {
		const user = this.users.find(user => user.id === user_id);

		return user;
	}
	
}

export { UserRepositoriesInMemory }