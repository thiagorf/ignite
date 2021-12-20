import {  ISpecificationRepository } from "../../repositories/implementations/ISpecificationRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../erros/appError";

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateSpecificationUseCase {
	constructor(@inject("SpecificationRepositories") private specificationRepository: ISpecificationRepository){}

	async execute({name, description}: IRequest): Promise<void> {
		const specificationAlreadyExist = await this.specificationRepository.findByName(name);

		if(specificationAlreadyExist) {
			throw new AppError("Specification already exists");
		}

		await this.specificationRepository.create({
			name,
			description
		})
	}
}

export { CreateSpecificationUseCase }