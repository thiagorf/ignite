import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


class CreateCarSpecificationController {

	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { specification_id } = request.body;

		const carSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

		const car = await carSpecificationUseCase.execute({
			car_id: id,
			specification_id 
		});

		return response.json(car);
	}
}

export { CreateCarSpecificationController }