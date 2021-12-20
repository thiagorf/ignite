import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase"




class UpdateUserAvatarController {

	async handle(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.user;
		const avatarFile = request.file.filename;

		const userUseCase = container.resolve(UpdateUserAvatarUseCase);

		await userUseCase.execute({user_id: id, avatarFile})

		return response.status(201).send()
	}

}

export { UpdateUserAvatarController }