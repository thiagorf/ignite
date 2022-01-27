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
		const rentalByCar = await this.repositories.findOne({
			where: {car_id, end_date: null}
		});

		return rentalByCar
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rentalByUser = await this.repositories.findOne({
			where: {user_id, end_date: null}
		});

		return rentalByUser;
	}

	async create(data: IRentalRequest): Promise<Rental> {
		const { car_id, user_id, expected_return_date, end_date, total, id } = data;

		const rental = this.repositories.create({
			car_id,
			user_id,
			expected_return_date,
			end_date,
			total,
			id
		});

		await this.repositories.save(rental);

		return rental;
	}

	async findRentalById(id: string): Promise<Rental> {
		const rental = this.repositories.findOne(id);

		return rental
	}

	async findAllRentalsByUser(user_id: string): Promise<Rental[]> {
		const rentals = await this.repositories.find({user_id});

		return rentals;
	}
	
}

export { RentalRepositories }