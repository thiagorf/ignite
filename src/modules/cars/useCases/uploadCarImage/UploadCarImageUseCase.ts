import { ICarImageRepositories } from "@modules/cars/repositories/implementations/ICarImageRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
	car_id: string;
	image_name: string[];
}

@injectable()
class UploadCarImageUseCase {

	constructor(
		@inject("CarImageRepositories")
		private repositories: ICarImageRepositories
	){}

	async execute({car_id, image_name}: IRequest) {
		image_name.map(async (image) => 
			await this.repositories.create(
				car_id,
				image
			)
		)
		
	}	
}

export { UploadCarImageUseCase }

