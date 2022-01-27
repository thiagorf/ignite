import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";



class DevolutionRentalController {
	async handle(request: Request, response: Response) {
		const user_id = request.user.id;

		const { id } = request.params;

		const devolutionUseCase = container.resolve(DevolutionRentalUseCase);

		const devolutionResult = await devolutionUseCase.execute({user_id, id});

		return response.json(devolutionResult)
		
	}
}

export { DevolutionRentalController }