import { UserRepositories } from "@modules/accounts/infra/typeorm/repositories/users.repositories";
import { AppError } from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";




export async function ensureUserIsAdmin(request: Request, response: Response ,next: NextFunction){
	const { id } = request.user;

	//Porque tem que criar um novo repositorio e não pegar um existente?
	//const userRepository = getRepository(UserRepositories);
	const userRepository = new UserRepositories();

	const userIsAdmin = await userRepository.findById(id);

	if(userIsAdmin.admin) {
		return next();
	}

	throw new AppError("You need to be a admin!");
}

