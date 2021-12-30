import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { ISpecificationRepository } from "@modules/cars/repositories/implementations/ISpecificationRepository";


@injectable()
class ListSpecificationUseCase {

	constructor(@inject("SpecificationRepositories") private specificationRepositories: ISpecificationRepository) {}

	async execute(): Promise<Specification[]>
	{
		const specifications = await this.specificationRepositories.list()

		return specifications
	}
}

export { ListSpecificationUseCase }