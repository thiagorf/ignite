import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/userTokens";
import { IUsersTokensRepositories } from "../implementations/IUsersTokensRepositories";



class UsersTokensRepositoriesInMemory implements IUsersTokensRepositories {
	private usersTokens: UserTokens[] = []


	async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
		const usersTokens = new UserTokens()

		Object.assign(usersTokens, {
			user_id,
			refresh_token,
			expires_date
		});

		this.usersTokens.push(usersTokens);

		return usersTokens
	}

	async findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens> {
		const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token)
		
		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		const userTokenIndex = this.usersTokens.findIndex(userToken => userToken.id === id);

		this.usersTokens.splice(userTokenIndex, 1)
	}

	async findByToken(token: string): Promise<UserTokens> {
		const userToken = this.usersTokens.find(userTokens => userTokens.refresh_token === token);
		
		return userToken;
	}

}

export { UsersTokensRepositoriesInMemory }