import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { AppError } from "@shared/errors/appError";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/car";



class CarRepository implements ICarRepositories {

	private repository: Repository<Car>

	constructor() {
		this.repository = getRepository(Car);
	}

	async create({
		name, 
		description, 
		daily_rate, 
		license_plate, 
		fine_amount, 
		brand, 
		category_id
	}: ICreateCarDTO): Promise<Car> {

		const carAlreadyExists = await this.findByLicensePlate(license_plate);

		if(carAlreadyExists) {
			throw new AppError("Car already exists!");
		}
	
		const car = this.repository.create({
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id
		});

		await this.repository.save(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({license_plate})

		return car;
	}

}

export { CarRepository }