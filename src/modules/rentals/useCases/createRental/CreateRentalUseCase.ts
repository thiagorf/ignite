import { Rental } from "@modules/rentals/infra/typeorm/entities/rentals";
import { IRentalsRepositories } from "@modules/rentals/repositories/IRentalsRepositories";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	car_id: string;
	user_id: string;
	expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
	
	constructor(
	@inject("RentalRepositories")	
	private repositories: IRentalsRepositories,
	@inject("DayjsDateProvider")
	private dateProvider: IDateProvider	
	) {}

	async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental>{
		const minimumHour = 24;

		const carUnavailable = await this.repositories.findOpenRentalByCar(car_id);

		if(carUnavailable) {
			throw new AppError("Car is unavailable!");
		}

		const rentalOpenToUser = await this.repositories.findOpenRentalByUser(user_id);

		if(rentalOpenToUser) {
			throw new AppError("there's a rental in progress for user");
		}


		const dateNow = this.dateProvider.dateNow()	
		const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)
		if(compare < minimumHour) {
			throw new AppError("Invalid return time!");
		}


		const rental = await this.repositories.create({
			car_id,
			user_id,
			expected_return_date
		});

		return rental;
	}
}

export { CreateRentalUseCase }