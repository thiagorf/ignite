import { inject, injectable } from "tsyringe";
import { IUserRepositories } from "../../repositories/implementations/IUsersRepositories";
import { deleteFile } from '../../../../utils/file';

interface IRequest {
	user_id: string;
	avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

	constructor(@inject("UserRepositories") private repositories: IUserRepositories) {}

	async execute({ user_id, avatarFile }: IRequest): Promise<void>
	{
		const user = await this.repositories.findById(user_id);

		if(user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}

		user.avatar = avatarFile;

		await this.repositories.create(user);
	}
}

export { UpdateUserAvatarUseCase }