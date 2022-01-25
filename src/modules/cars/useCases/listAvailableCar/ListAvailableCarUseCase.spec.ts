import { CarsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase"


let carsRepositoriesInMemory: CarsRepositoriesInMemory
let listAvailableCarUseCase: ListAvailableCarUseCase;


describe("List available cars", () => {

	beforeEach(() => {
		carsRepositoriesInMemory = new CarsRepositoriesInMemory();
		listAvailableCarUseCase = new ListAvailableCarUseCase(carsRepositoriesInMemory);
	})

	it("Should be able to list all available cars", async () => {
		const car = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		const cars = await listAvailableCarUseCase.execute();
		
		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const defaultCar = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});
		

		const searchCar = await carsRepositoriesInMemory.create({
			name: "test2",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});

		const availableCarsWithCertainName = await listAvailableCarUseCase.execute({
			name: "test2"
		});
		expect(availableCarsWithCertainName).toEqual([searchCar])
	});

	it("should be able to list all available cars by brand", async () => {
		const defaultCar = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});
		

		const searchCar = await carsRepositoriesInMemory.create({
			name: "test2",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test2",
			category_id: "category"
		});

		const cars = await listAvailableCarUseCase.execute({brand: "test2"})
		expect(cars).toEqual([searchCar]);
	});

	it("should be able to list all available cars by category_id", async () => {
		const defaultCar = await carsRepositoriesInMemory.create({
			name: "test",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test",
			category_id: "category"
		});
		

		const searchCar = await carsRepositoriesInMemory.create({
			name: "test2",
			description: "test",
			daily_rate: 100,
			license_plate: "test",
			fine_amount: 60,
			brand: "test2",
			category_id: "category2"
		});

		const cars = await listAvailableCarUseCase.execute({
			category_id: "category2"
		});

		expect(cars).toEqual([searchCar]);
	})
})