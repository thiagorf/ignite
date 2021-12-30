import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarRepositories } from "../implementations/ICarRepositories";




class CarsRepositoriesInMemory implements ICarRepositories{
	cars: Car[] = [];

	async create({
		name, 
		description, 
		daily_rate, 
		license_plate, 
		fine_amount, 
		brand, 
		category_id
	 }: ICreateCarDTO): Promise<Car> {

		const cars = new Car();

		Object.assign(cars, {
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id
		});

		this.cars.push(cars);

		return cars;
	};

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = this.cars.find(car => car.license_plate === license_plate);

		return car;
	}

}

export { CarsRepositoriesInMemory }