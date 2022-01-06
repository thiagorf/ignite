import { ICarImageRepositories } from "@modules/cars/repositories/implementations/ICarImageRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { deleteFile } from '@utils/file'

@injectable()
class DeleteCarImageUseCase {

	constructor(
	@inject("CarImageRepositories")
	private repositories: ICarImageRepositories	
	) {}

	async execute(carImage_id: string): Promise<void> {
		const carExists = await this.repositories.findCarImage(carImage_id);
		
		if(!carExists) {
			throw new AppError("Image not found", 400);
		}

		await deleteFile(`./tmp/carImages/${carExists.image_name}`);
		await this.repositories.deleteImage(carImage_id);

	}
}

export { DeleteCarImageUseCase }