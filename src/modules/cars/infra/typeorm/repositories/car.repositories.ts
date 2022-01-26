import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { IQueryParam } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarUseCase";
import { AppError } from "@shared/errors/appError";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/car";



class CarRepository implements ICarRepositories {

	private repository: Repository<Car>

	constructor() {
		this.repository = getRepository(Car);
	}

	async findById(car_id: string): Promise<Car> {
		const car = await this.repository.findOne(car_id);

		return car;
	}

	async create({
		name, 
		description, 
		daily_rate, 
		license_plate, 
		fine_amount, 
		brand, 
		category_id,
		specifications
	}: ICreateCarDTO): Promise<Car> {

		//OBSERVAR DEPOIS
		/*
		const carAlreadyExists = await this.findByLicensePlate(license_plate);

		if(carAlreadyExists) {
			throw new AppError("Car already exists!");
		}*/
	
		const car = this.repository.create({
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id,
			specifications
		});

		await this.repository.save(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({license_plate})

		return car;
	}

	async listAllAvailableCars(data?: IQueryParam): Promise<Car[]> {

		//const { name } = data;

		//const cars = await this.repository.find({where: {available: true}})

		const carsQuery = await this.repository.createQueryBuilder("car")
		.where("available = :available", { available: true })

		if(data) {
			let value: string;

			for(const query in data) {
				if(data[query]) {
					value = data[query]
					carsQuery.andWhere(`${query} = :${query}`, { [query]: value})
				}
			}
		}

		const cars = await carsQuery.getMany();
		
		return cars;
	}


	async updateAvailable(id: string, available: boolean): Promise<void> {
		await this.repository
		.createQueryBuilder()
		.update()
		.set({available})
		.where("id = :id")
		.setParameters({id})
		.execute()
	}
}

export { CarRepository }