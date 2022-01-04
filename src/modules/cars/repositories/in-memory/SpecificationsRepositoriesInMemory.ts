import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { ISpecificationDTO, ISpecificationRepository } from "../implementations/ISpecificationRepository";



class SpecificationsRepositoriesInMemory implements ISpecificationRepository {
	specification: Specification[] = []

	async create({ name, description }: ISpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description
		});

		this.specification.push(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification> {
		return this.specification.find(specification => specification.name === name);
	}

	async list(): Promise<Specification[]> {
		throw new Error("Method not implemented.");
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const allSpecifications = this.specification.filter((specification) => ids.includes(specification.id));

		console.log(allSpecifications)
		return allSpecifications;
	}

}

export { SpecificationsRepositoriesInMemory }