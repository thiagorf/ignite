import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { SpecificationsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoriesInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoriesInMemory: CarsRepositoriesInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoriesInMemory: SpecificationsRepositoriesInMemory;

describe("Create car specification", () => {

	beforeEach(() => {
		specificationsRepositoriesInMemory = new SpecificationsRepositoriesInMemory()
		carsRepositoriesInMemory = new CarsRepositoriesInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoriesInMemory,
			specificationsRepositoriesInMemory
		);
	})

	it("should be able to add new specification to the car", async () => {

		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		const specification = await specificationsRepositoriesInMemory.create({
			name: "test",
			description: "test"
		});
		
		const specification_id = [specification.id]

		await createCarSpecificationUseCase.execute({
			car_id: car.id, 
			specification_id
		});

	})

	it("should not be able to add new specification to an inexistent  car", async () => {
		expect( async () => {
			const car_id = "1234"
			const specification_id = ["4321"]

			await createCarSpecificationUseCase.execute({
				car_id, 
				specification_id
			});
		}).rejects.toBeInstanceOf(AppError);

	})
})