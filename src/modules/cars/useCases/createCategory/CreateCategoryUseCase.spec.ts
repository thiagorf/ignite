import { AppError } from "@shared/errors/appError";
import { CategoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoriesInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let categoryRepositoriesInMemory: CategoriesRepositoriesInMemory;
let createCategoryUseCase: CreateCategoryUseCase; 

describe("Create a new Category", () => {
	beforeEach(() => {
		categoryRepositoriesInMemory = new CategoriesRepositoriesInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoriesInMemory);
	});

	it("should be able to create a new category", async () => {
		const category = {
			name: "test",
			description: "test"
		}

		await createCategoryUseCase.execute({name: category.name, description: category.description});

		const categoryCreated = await categoryRepositoriesInMemory.findByName(category.name);

		expect(categoryCreated).toHaveProperty("id");
		
	})

	it("should not be able to create a new category with same name", async () => {
		const category = {
			name: "test",
			description: "test"
		}

		await createCategoryUseCase.execute({name: category.name, description: category.description})

		await expect(
			createCategoryUseCase.execute({name: category.name, description: category.description})
		
		).rejects.toEqual(new AppError ("Category already exists"));

		
	})
})