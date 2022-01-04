import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { ISpecificationRepository } from "@modules/cars/repositories/implementations/ISpecificationRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	car_id: string;
	specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
		@inject("CarRepositories") private repositories: ICarRepositories,
		@inject("SpecificationRepositories") private specification: ISpecificationRepository
		){}

	async execute({ car_id, specification_id }: IRequest): Promise<Car> {

		const carExists = await this.repositories.findById(car_id)
		
		if(!carExists) {
			throw new AppError("Car doesn't exists", 400);
		}

		const allSpecifications = await this.specification.findByIds(specification_id);

		carExists.specifications = allSpecifications;

		await this.repositories.create(carExists);

		return carExists;
	}
}

export { CreateCarSpecificationUseCase }