import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { IRentalsRepositories } from "@modules/rentals/repositories/IRentalsRepositories";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
	id: string;
	user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
	constructor(
	@inject("DayjsDateProvider")
	private dateProvider: IDateProvider,
	@inject("RentalRepositories")
	private repository: IRentalsRepositories,
	@inject("CarRepositories")
	private carRepository: ICarRepositories
	)
	{}

	async execute({id , user_id}: IRequest) {
		const minimum_amount = 1;

		const rental = await this.repository.findRentalById(id);
		const car = await this.carRepository.findById(rental.car_id);
		
		const dateNow = this.dateProvider.dateNow()

		let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)

		if(daily <= 0) {
			daily = minimum_amount
		}

		let total = 0;

		const paymentForDaysUsed = daily * car.daily_rate 

		total = paymentForDaysUsed;
		
		const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);

		if(delay > 0) {
			const fineAmountInDays = car.fine_amount * delay;

			total += fineAmountInDays
		}

		rental.total = total;
		rental.end_date = this.dateProvider.dateNow();

		await this.carRepository.updateAvailable(car.id, true)

		await this.repository.create(rental);


		/**
		 * TODO
		 * TESTE DO USE CASE
		 * CONTROLLER
		 * ROTAS
		 */
		return rental;
	}
}

export { DevolutionRentalUseCase }