import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { IQueryParam } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarUseCase";
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

	async listAllAvailableCars(data?: IQueryParam): Promise<Car[]> {

		let cars = this.cars.filter(car => car.available === true);

		if(data) {

			let value: string;

			for(const query in data) {
				if(data[query]) {
					value = data[query];

					//const filteredCars = cars.filter(car => car[query] === value)
					cars = cars.filter(car => car[query] === value)

					//return filteredCars;
				}
			}	

		}
		
		return cars;
	}

	async findById(car_id: string): Promise<Car> {
		const car = this.cars.find(car => car.id === car_id);

		return car;
	}

	async updateAvailable(id: string, available: boolean): Promise<void> {
		const carIndex = this.cars.findIndex(car => car.id === id);
		this.cars[carIndex].available = available
	}
	
}

export { CarsRepositoriesInMemory }