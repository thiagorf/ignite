import { UserRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoriesInMemory";
import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { RentalsRepositoriesInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoriesInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";


let devolutionRentalUseCase: DevolutionRentalUseCase;
let rentalRepositoriesInMemory: RentalsRepositoriesInMemory;
let userRepositoriesInMemory: UserRepositoriesInMemory;
let carRepositoriesInMemory: CarsRepositoriesInMemory;
let dayJsDateProvider: DayjsDateProvider

describe("Devolution Rental Use Case", () => {
	beforeEach(() => {

		dayJsDateProvider = new DayjsDateProvider()
		userRepositoriesInMemory = new UserRepositoriesInMemory()
		carRepositoriesInMemory = new CarsRepositoriesInMemory()
		rentalRepositoriesInMemory = new RentalsRepositoriesInMemory()

		devolutionRentalUseCase = new DevolutionRentalUseCase(
			dayJsDateProvider,
			rentalRepositoriesInMemory, 
			carRepositoriesInMemory 
			)
	})

	it("Should be able to devolve a rental", async () => {
		const car = await carRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		const user = await userRepositoriesInMemory.create({
			driver_license: "0002",
			email: "test",
			name: "test",
			password: "test"
		})

		const newRental = await rentalRepositoriesInMemory.create({
			car_id: car.id,
			user_id: user.id,
			expected_return_date: new Date("01/30/22")
		})

		const rental = await devolutionRentalUseCase.execute({id: newRental.id, user_id: user.id});

		expect(rental.total).toBeTruthy
		expect(rental.end_date).toBeTruthy
	})
})