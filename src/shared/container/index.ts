import { container } from 'tsyringe';
import { ICategoriesRepositories } from '../../modules/cars/repositories/implementations/ICategoriesRepository';
import { CategoryRepository } from '../../modules/cars/infra/typeorm/repositories/categories.repositories';

import { ISpecificationRepository } from '../../modules/cars/repositories/implementations/ISpecificationRepository';
import { SpecificationRepositories } from '../../modules/cars/infra/typeorm/repositories/specification.repositories'
import { IUserRepositories } from '../../modules/accounts/repositories/implementations/IUsersRepositories';
import { UserRepositories } from '../../modules/accounts/infra/typeorm/repositories/users.repositories';
import { ICarRepositories } from '@modules/cars/repositories/implementations/ICarRepositories';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/car.repositories';
import { ICarImageRepositories } from '@modules/cars/repositories/implementations/ICarImageRepositories';
import { CarImageRepositories } from '@modules/cars/infra/typeorm/repositories/car.image.repositories';

// ICategoriesRepositories
container.registerSingleton<ICategoriesRepositories>(
	"CategoryRepository",
	CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
	"SpecificationRepositories",
	SpecificationRepositories
);

container.registerSingleton<IUserRepositories>(
	"UserRepositories",
	UserRepositories
);

container.registerSingleton<ICarRepositories>(
	"CarRepositories",
	CarRepository
);

container.registerSingleton<ICarImageRepositories>(
	"CarImageRepositories",
	CarImageRepositories
)

