import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { ICategoriesRepositories } from "@modules/cars/repositories/implementations/ICategoriesRepository";



@injectable()
class ListCategoryUseCase {

	constructor(@inject("CategoryRepository") private categories: ICategoriesRepositories) {}

	async execute(): Promise<Category[]>
	{
		const categories = await this.categories.list();
		
		return categories;
	}
}

export { ListCategoryUseCase }