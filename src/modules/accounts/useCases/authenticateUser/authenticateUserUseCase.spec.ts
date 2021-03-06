import { AppError } from "@shared/errors/appError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoriesInMemory"
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { UsersTokensRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoriesInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let userRepositoriesInMemory: UserRepositoriesInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase
let userTokenRepositoriesInMemory: UsersTokensRepositoriesInMemory;
let dayjsDateProvider: DayjsDateProvider

describe("Authenticate user", () => {

	beforeEach(() => {
		dayjsDateProvider = new DayjsDateProvider()
		userTokenRepositoriesInMemory = new UsersTokensRepositoriesInMemory()
		userRepositoriesInMemory = new UserRepositoriesInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoriesInMemory, userTokenRepositoriesInMemory, dayjsDateProvider);
		createUserUseCase = new CreateUserUseCase(userRepositoriesInMemory);;
	})

	it("should be able to athenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: "0002",
			email: "test",
			name: "test",
			password: "test"
		}

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be possible to authenticate an noenxistent user",  async () => {

		await expect(
			authenticateUserUseCase.execute({
				email: "test231",
				password: "test1212"
			})
		).rejects.toEqual(new AppError("Email or password incorrets"));
	})

	it("should not be able to athenticate with incorrect password", async () => {
		const user: ICreateUserDTO = {
			driver_license: "0002",
			email: "test",
			name: "test",
			password: "test"
		}

		await createUserUseCase.execute(user);

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: "test121"
			})

		).rejects.toEqual(new AppError("Email or password incorrects!"));	
	});
})

