import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car"


interface ICarRepositories {
	create(data: ICreateCarDTO): Promise<Car>
	findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarRepositories }