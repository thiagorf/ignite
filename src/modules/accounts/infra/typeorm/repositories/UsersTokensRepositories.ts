import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepositories } from "@modules/accounts/repositories/implementations/IUsersTokensRepositories";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/userTokens";



class UsersTokensRepositories implements IUsersTokensRepositories {
	private repositories: Repository<UserTokens>

	constructor() {
		this.repositories = getRepository(UserTokens);
	}

	async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
		const userToken = this.repositories.create({
			user_id,
			refresh_token,
			expires_date
		});

		await this.repositories.save(userToken);

		return userToken
	}

	async findByUserIdAndToken(user_id: string, token): Promise<UserTokens> {
		const userToken = await this.repositories.findOne({
			user_id,
			refresh_token: token
		});

		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		await this.repositories.delete(id)
	}

}

export { UsersTokensRepositories }