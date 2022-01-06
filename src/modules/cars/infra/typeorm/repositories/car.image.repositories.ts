import { ICarImageRepositories } from "@modules/cars/repositories/implementations/ICarImageRepositories";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/carImage";



class CarImageRepositories implements ICarImageRepositories {
	repositories: Repository<CarImage>

	constructor() {
		this.repositories = getRepository(CarImage);
	}

	async create(car_id: string, image_name: string): Promise<CarImage> {
		const carImage = this.repositories.create({
			car_id,
			image_name
		});

		await this.repositories.save(carImage);

		return carImage;
	}

	async findCarImage(carImage_id: string): Promise<CarImage> {
		const carImage = await this.repositories.findOne(carImage_id);

		return carImage

	}

	async deleteImage(carImage_id: string): Promise<void> {
		await this.repositories.delete(carImage_id)
	}
}

export { CarImageRepositories }