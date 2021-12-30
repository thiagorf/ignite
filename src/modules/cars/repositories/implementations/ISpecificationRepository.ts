import { Specification } from "@modules/cars/infra/typeorm/entities/specification";


interface ISpecificationDTO {
	name: string;
	description: string;
}


interface ISpecificationRepository {
	create({name, description}: ISpecificationDTO): Promise<void>
	findByName(name: string): Promise<Specification>
	list(): Promise<Specification[]>
}

export { ISpecificationRepository, ISpecificationDTO }