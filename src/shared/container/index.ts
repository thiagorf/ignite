import { container } from 'tsyringe';
import { ICategoriesRepositories } from '../../modules/cars/repositories/implementations/ICategoriesRepository';
import { CategoryRepository } from '../../modules/cars/repositories/categories.repositories';

import { ISpecificationRepository } from '../../modules/cars/repositories/implementations/ISpecificationRepository';
import { SpecificationRepositories } from '../../modules/cars/repositories/specification.repositories'
import { IUserRepositories } from '../../modules/accounts/repositories/implementations/IUsersRepositories';
import { UserRepositories } from '../../modules/accounts/repositories/users.repositories';

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
)

