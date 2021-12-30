import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	name: string;
	description: string;
	daily_rate: number;
	license_plate: string;
	fine_amount: number;
	brand: string;
	category_id: string;
}

@injectable()
class CreateCarUseCase {

	constructor(@inject("CarRepositories") private cars: ICarRepositories) {}

	async execute({ 
		name, 
		description, 
		daily_rate, 
		license_plate, 
		fine_amount, 
		brand, 
		category_id
	}: IRequest): Promise<Car> {
		
		const carAlreadyExists = await this.cars.findByLicensePlate(license_plate);

		if(carAlreadyExists) {
			throw new AppError("Car already exists!");
		}

		const cars = this.cars.create({
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id
		});

		return cars;
	}
}

export { CreateCarUseCase }