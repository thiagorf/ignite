import { IRentalRequest } from "@modules/rentals/dtos/IRentalRequest";
import { IRentalsRepositories } from "@modules/rentals/repositories/IRentalsRepositories";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/rentals";



class RentalRepositories implements IRentalsRepositories {
	repositories: Repository<Rental>

	constructor () {
		this.repositories = getRepository(Rental);
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const rentalByCar = await this.repositories.findOne(car_id);

		return rentalByCar
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rentalByUser = await this.repositories.findOne(user_id);

		return rentalByUser;
	}

	async create(data: IRentalRequest): Promise<Rental> {
		const { car_id, user_id, expected_return_date } = data;

		const rental = this.repositories.create({
			car_id,
			user_id,
			expected_return_date
		});

		await this.repositories.save(rental);

		return rental;
	}
	
}

export { RentalRepositories }