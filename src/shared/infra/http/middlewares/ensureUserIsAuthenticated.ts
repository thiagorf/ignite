import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/appError";
import { UserRepositories } from "@modules/accounts/infra/typeorm/repositories/users.repositories";
import auth from "@config/auth";

interface ITokenSub {
	sub: string;
}

export async function ensureUserIsAuthenticated(request: Request, response: Response, next: NextFunction)
{
	const authHeader  = request.headers.authorization;

	if(!authHeader) {
		throw new AppError("Token missing!", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id} = verify(token, auth.secret_token) as ITokenSub;

		const userRepositories = new UserRepositories();
		const user = await userRepositories.findById(user_id);

		if(!user) {
			throw new AppError("User don't exist", 401);
		}

		request.user = {
			id: user_id
		}

		next();

	} catch {
		throw new AppError("Invalid token", 401);
	}
}