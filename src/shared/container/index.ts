import { container } from 'tsyringe';
import { ICategoriesRepositories } from '../../modules/cars/repositories/implementations/ICategoriesRepository';
import { CategoryRepository } from '../../modules/cars/infra/typeorm/repositories/categories.repositories';

import "@shared/container/providers/index"


import { ISpecificationRepository } from '../../modules/cars/repositories/implementations/ISpecificationRepository';
import { SpecificationRepositories } from '../../modules/cars/infra/typeorm/repositories/specification.repositories'
import { IUserRepositories } from '../../modules/accounts/repositories/implementations/IUsersRepositories';
import { UserRepositories } from '../../modules/accounts/infra/typeorm/repositories/users.repositories';
import { ICarRepositories } from '@modules/cars/repositories/implementations/ICarRepositories';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/car.repositories';
import { ICarImageRepositories } from '@modules/cars/repositories/implementations/ICarImageRepositories';
import { CarImageRepositories } from '@modules/cars/infra/typeorm/repositories/car.image.repositories';
import { IRentalsRepositories } from '@modules/rentals/repositories/IRentalsRepositories';
import { RentalRepositories } from '@modules/rentals/infra/typeorm/repositories/RentalRepositories';
import { IUsersTokensRepositories } from '@modules/accounts/repositories/implementations/IUsersTokensRepositories';
import { UsersTokensRepositories } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepositories';

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
);

container.registerSingleton<IRentalsRepositories>(
	"RentalRepositories",
	RentalRepositories
);

container.registerSingleton<IUsersTokensRepositories>(
	"UsersTokensRepositories",
	UsersTokensRepositories
)


