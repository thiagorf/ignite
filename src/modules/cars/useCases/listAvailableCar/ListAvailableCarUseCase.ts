import { ICarRepositories } from "@modules/cars/repositories/implementations/ICarRepositories";
import { inject, injectable } from "tsyringe";

export interface IQueryParam {
	name?: string;
	brand?: string;
	category_id?: string;
}

@injectable()
class ListAvailableCarUseCase {
	
	constructor(@inject("CarRepositories") private cars: ICarRepositories){}

	async execute(data?: IQueryParam){

		const cars = await this.cars.listAllAvailableCars(data);

		return cars;
	}
}

export { ListAvailableCarUseCase }