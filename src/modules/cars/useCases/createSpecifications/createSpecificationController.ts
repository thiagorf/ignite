import { Request, Response } from 'express';
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';


class CreteSpecificationController {

	async handle(request: Request, response: Response): Promise<Response> 
	{
		const { name, description } = request.body;
		
		const specificationService = container.resolve(CreateSpecificationUseCase);

		await specificationService.execute({name, description});

		return response.status(201).send();

	}
}

export { CreteSpecificationController }