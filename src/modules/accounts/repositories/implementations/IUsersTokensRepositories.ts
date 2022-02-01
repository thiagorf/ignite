import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/userTokens";



interface IUsersTokensRepositories {
	create({user_id, refresh_token, expires_date}: ICreateUserTokenDTO): Promise<UserTokens>
	findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens>
	deleteById(id: string): Promise<void>
	findByToken(token: string): Promise<UserTokens>
}

export { IUsersTokensRepositories }