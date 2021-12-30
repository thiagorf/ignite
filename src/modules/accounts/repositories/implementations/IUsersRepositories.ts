import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { User } from "@modules/accounts/infra/typeorm/entities/user"

interface IUserRepositories {
	create(data: ICreateUserDTO): Promise<void>
	findByEmail(email: string): Promise<User>
	findById(user_id: string): Promise<User>
}

export { IUserRepositories }