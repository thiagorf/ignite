import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';


class CreateUserController {

	async handle(request: Request, response: Response): Promise<Response>
	{
		const { name, password, email, driver_license } = request.body;
		

		const userUseCase = container.resolve(CreateUserUseCase);

		await userUseCase.execute({ name, password, email, driver_license });		


		return response.status(201).send();
	}
}

export { CreateUserController } 
