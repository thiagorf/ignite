import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoryUseCase } from './ListCategoryUseCase';


class ListCategoryController {
	
	async handle(request: Request, response: Response): Promise<Response>
	{
		const categories = container.resolve(ListCategoryUseCase);

		const allCategories = await categories.execute();

		return response.json(allCategories);
	}
}

export { ListCategoryController }