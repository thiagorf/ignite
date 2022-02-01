import { RentalsRepositoriesInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoriesInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { UserRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoriesInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoriesInMemory: RentalsRepositoriesInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepositoriesInMemory: CarsRepositoriesInMemory
let userRepositoriesInMemory: UserRepositoriesInMemory;

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(2, "day").toDate();

	beforeEach(() => {
		userRepositoriesInMemory = new UserRepositoriesInMemory()
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
		const user = await userRepositoriesInMemory.create({
			driver_license: "0002",
			email: "test",
			name: "test",
			password: "test"
		})

		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});
		
		await createRentalUseCase.execute({
			car_id: car.id,
			user_id: user.id,
			expected_return_date: dayAdd24Hours
		});

		await expect(
			createRentalUseCase.execute({
				car_id: "1234",
				user_id: user.id,
				expected_return_date: dayAdd24Hours
			})
		).rejects.toEqual(new AppError("there's a rental in progress for user"))
		
	})

	it("should not be able to create a new rentail if theres is another open to the same car", async () => {
		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		})
		
		await createRentalUseCase.execute({
			car_id: car.id,
			user_id: "12345",
			expected_return_date: dayAdd24Hours
		});
		
		await expect(
			createRentalUseCase.execute({
				car_id: car.id,
				user_id: "1234",
				expected_return_date: dayAdd24Hours
			})
		).rejects.toEqual(new AppError("Car is unavailable!"))
		
	})

	
	it("should not be able to create a new rentail with invalid return time", async () => {
		await expect(
			createRentalUseCase.execute({
				car_id: "1234",
				user_id: "12345",
				expected_return_date: dayjs().toDate()
			})

		).rejects.toEqual(new AppError ("Invalid return time!"));
		
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