import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoriesInMemory: CarsRepositoriesInMemory;

describe("create car", () => {

	beforeEach(() => {
		carsRepositoriesInMemory = new CarsRepositoriesInMemory()
		createCarUseCase = new CreateCarUseCase(carsRepositoriesInMemory);
	})

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		expect(car).toHaveProperty("id")
	});

	it("should not be able to create a car with exists license plate", () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "test",
				description: "test",
				daily_rate: 100,
				license_plate: "test",
				fine_amount: 60,
				brand: "test",
				category_id: "category"
			});

			await createCarUseCase.execute({
				name: "test2",
				description: "test",
				daily_rate: 100,
				license_plate: "test",
				fine_amount: 60,
				brand: "test",
				category_id: "category"
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("the car should be available by default", async () => {
		const car = await createCarUseCase.execute({
			name: "test2",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		expect(car.available).toBe(true);

	})
})