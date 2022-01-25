import { IRentalRequest } from "../dtos/IRentalRequest";
import { Rental } from "../infra/typeorm/entities/rentals";


interface IRentalsRepositories {
	findOpenRentalByCar(car_id: string): Promise<Rental>
	findOpenRentalByUser(user_id: string): Promise<Rental>
	create(data: IRentalRequest): Promise<Rental>
}

export { IRentalsRepositories }