import { RentalsRepositoriesInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoriesInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoriesInMemory: RentalsRepositoriesInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepositoriesInMemory: CarsRepositoriesInMemory

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		rentalsRepositoriesInMemory = new RentalsRepositoriesInMemory()
		dayjsProvider = new DayjsDateProvider()
		carsRepositoriesInMemory = new CarsRepositoriesInMemory()
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoriesInMemory, dayjsProvider, carsRepositoriesInMemory);
	});

	it("should be able to create a new rentail", async () => {
		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});
		
		const rental = await createRentalUseCase.execute({
			car_id: car.id,
			user_id: "1234",
			expected_return_date: dayAdd24Hours
		});


		expect(rental).toHaveProperty("id")
		expect(rental).toHaveProperty("start_date")
	})

	it("should not be able to create a new rentail if theres is another open to the same user", async () => {
		expect(async () => {

			const rental1 = await createRentalUseCase.execute({
				car_id: "12345",
				user_id: "1234",
				expected_return_date: dayAdd24Hours
			});

			const rental2 = await createRentalUseCase.execute({
				car_id: "1234",
				user_id: "1234",
				expected_return_date: dayAdd24Hours
			});
		}).rejects.toBeInstanceOf(AppError)
		
	})

	it("should not be able to create a new rentail if theres is another open to the same car", () => {
		expect(async () => {

			await createRentalUseCase.execute({
				car_id: "1234",
				user_id: "12345",
				expected_return_date: dayAdd24Hours
			});

			await createRentalUseCase.execute({
				car_id: "1234",
				user_id: "1234",
				expected_return_date: dayAdd24Hours
			});
		}).rejects.toBeInstanceOf(AppError)
		
	})

	
	it("should not be able to create a new rentail with invalid return time", () => {
		expect(async () => {

			await createRentalUseCase.execute({
				car_id: "1234",
				user_id: "12345",
				expected_return_date: dayjs().toDate()
			});

		}).rejects.toBeInstanceOf(AppError)
		
	})

	it("should be able to change car availability after creating a rental", async () => {
		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		const rental = await createRentalUseCase.execute({
			car_id: car.id,
			user_id: "12345",
			expected_return_date: dayAdd24Hours
		});

		expect(car.available).toBe(false);
	})
})