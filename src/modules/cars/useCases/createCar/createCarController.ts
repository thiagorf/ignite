import { CarRepository } from "@modules/cars/infra/typeorm/repositories/car.repositories";
import { Request, Response } from "express";
import { container } from "tsyringe";



class CreateCarController {

	async handle(request: Request, response: Response): Promise<Response>
	{
		const {
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id
		} = request.body

		const carUseCase = container.resolve(CarRepository);

		const car = await carUseCase.create({
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id
		});

		return response.status(201).json(car);
	}
}

export { CreateCarController }