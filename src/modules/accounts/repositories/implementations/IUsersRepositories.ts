import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { User } from "../../entities/user"

interface IUserRepositories {
	create(data: ICreateUserDTO): Promise<void>
	findByEmail(email: string): Promise<User>
	findById(user_id: string): Promise<User>
}

export { IUserRepositories }