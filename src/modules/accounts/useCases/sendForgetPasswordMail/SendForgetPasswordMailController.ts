import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgetPasswordMailUseCase } from "./SendForgetPasswordMailUseCase";



class SendForgetPasswordMailController {
	async handle(request: Request, response: Response): Promise<Response> {

		const { email } = request.body;

		const forgetPasswordUseCase = container.resolve(SendForgetPasswordMailUseCase);

		await forgetPasswordUseCase.execute(email);

		return response.json();
	}
}

export { SendForgetPasswordMailController }