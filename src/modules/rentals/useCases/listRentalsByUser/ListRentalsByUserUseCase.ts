import { IRentalsRepositories } from "@modules/rentals/repositories/IRentalsRepositories";
import { inject, injectable } from "tsyringe";


@injectable()
class ListRentalsByUserUseCase {

	constructor(
		@inject("RentalRepositories")
		private repositories: IRentalsRepositories
	) {}

	async execute(user_id: string) {

		const rentalsByUser = await this.repositories.findAllRentalsByUser(user_id);

		return rentalsByUser;
	}
}

export { ListRentalsByUserUseCase }