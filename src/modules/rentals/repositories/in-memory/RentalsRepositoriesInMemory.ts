import { IRentalRequest } from "@modules/rentals/dtos/IRentalRequest";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rentals";
import { IRentalsRepositories } from "../IRentalsRepositories";



class RentalsRepositoriesInMemory implements IRentalsRepositories {
	rentals: Rental[] = []

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const car = this.rentals.find(car => car.car_id === car_id && !car.end_date);

		return car;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const user = this.rentals.find(user => user.user_id === user_id && !user.end_date);
		
		return user;
	}
	
	async create(data: IRentalRequest): Promise<Rental> {
		const { car_id, user_id, expected_return_date } = data;

		const rental = new Rental()

		Object.assign(rental, {
			car_id,
			user_id,
			expected_return_date,
			start_date: new Date()
		});

		this.rentals.push(rental);

		return rental;
	}

	async findRentalById(id: string): Promise<Rental> {
		const rental = this.rentals.find(rental => rental.id === id);
		
		return rental;
	}
}

export { RentalsRepositoriesInMemory }