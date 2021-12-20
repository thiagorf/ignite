import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";



class AuthenticateUserController {
	async handle(request: Request, response: Response)
	{
		const { email, password } = request.body;

		const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

		const authenticateInfo = await authenticateUseCase.execute({email, password});

		return response.json(authenticateInfo);

	}
}

export { AuthenticateUserController }