import { IRentalRequest } from "../dtos/IRentalRequest";
import { Rental } from "../infra/typeorm/entities/rentals";


interface IRentalsRepositories {
	findOpenRentalByCar(car_id: string): Promise<Rental>
	findOpenRentalByUser(user_id: string): Promise<Rental>
	findAllRentalsByUser(user_id: string): Promise<Rental[]>
	findRentalById(id: string): Promise<Rental>
	create(data: IRentalRequest): Promise<Rental>
}

export { IRentalsRepositories }