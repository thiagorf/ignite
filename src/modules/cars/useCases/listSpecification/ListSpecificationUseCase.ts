import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/specification";
import { ISpecificationRepository } from "../../repositories/implementations/ISpecificationRepository";


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