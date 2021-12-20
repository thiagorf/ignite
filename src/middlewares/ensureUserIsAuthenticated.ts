import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "../erros/appError";
import { UserRepositories } from "../modules/accounts/repositories/users.repositories";

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
		const { sub: user_id} = verify(token, "secret") as ITokenSub;

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