import {injectable, inject } from 'tsyringe';

import { ICategoriesRepositories } from '../../repositories/implementations/ICategoriesRepository';

interface IRequest {
	name: string;
	description: string
}



//mudar para Service para UseCase
@injectable()
class CreateCategoryUseCase {
	constructor(@inject("CategoryRepository") private categories: ICategoriesRepositories) {}

	async execute({name, description}: IRequest): Promise<void>
	{
		const categoryAlreadyExists = await this.categories.findByName(name);

		if(categoryAlreadyExists) {
			console.log("bugado")
			//throw new Error("Category already exists");
		}

		await this.categories.create({name, description});
		//Possivel refatoração
	}
}

export { CreateCategoryUseCase }