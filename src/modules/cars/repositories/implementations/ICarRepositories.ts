import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car"
import { IQueryParam } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarUseCase";


interface ICarRepositories {
	create(data: ICreateCarDTO): Promise<Car>
	findByLicensePlate(license_plate: string): Promise<Car>
	listAllAvailableCars(data?: IQueryParam): Promise<Car[]>
	findById(car_id: string): Promise<Car>
}

export { ICarRepositories }