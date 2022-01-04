import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/specification";
import { ISpecificationDTO, ISpecificationRepository } from "../../../repositories/implementations/ISpecificationRepository";



class SpecificationRepositories implements ISpecificationRepository {
	private specifications: Repository<Specification>;

	constructor() {
		this.specifications = getRepository(Specification);
	}


	async create({ name, description }: ISpecificationDTO): Promise<Specification> 
	{
		const specification = this.specifications.create({
			name,
			description
		})


		await this.specifications.save(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification>
	{
		const specification = await this.specifications.findOne({name});

		return specification;
	}

	async list(): Promise<Specification[]>
	{
		const specification = await this.specifications.find()

		return specification;
	}
	
	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = this.specifications.findByIds(ids);
	
		return specifications;
	}

}

export { SpecificationRepositories }