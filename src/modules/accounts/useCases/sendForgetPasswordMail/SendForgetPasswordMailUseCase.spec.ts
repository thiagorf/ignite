import { UserRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoriesInMemory";
import { UsersTokensRepositoriesInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoriesInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/InMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/appError";
import { SendForgetPasswordMailUseCase } from "./SendForgetPasswordMailUseCase"


let userRepositoriesInMemory: UserRepositoriesInMemory;
let userTokensRepositoriesInMemory: UsersTokensRepositoriesInMemory;
let dayjsDateProvider: DayjsDateProvider
let mailproviderInMemory: MailProviderInMemory;
let sendForgetPasswordMail: SendForgetPasswordMailUseCase;

describe("Send forget password mail", () => {

	beforeEach(() => {
		userRepositoriesInMemory = new UserRepositoriesInMemory();
		userTokensRepositoriesInMemory = new UsersTokensRepositoriesInMemory();
		dayjsDateProvider = new DayjsDateProvider();
		mailproviderInMemory = new MailProviderInMemory()

		sendForgetPasswordMail = new SendForgetPasswordMailUseCase(
			userRepositoriesInMemory,
			userTokensRepositoriesInMemory,
			dayjsDateProvider,
			mailproviderInMemory

		)
	})

	it("Should be able to send link to change password", async () => {
		const sendMail = jest.spyOn(mailproviderInMemory, "sendMail");

		const user = await userRepositoriesInMemory.create({
			name: "test",
			email: "test@mail",
			password: "test",
			driver_license: "XXX-XXX"
		})

		await sendForgetPasswordMail.execute(user.email)

		expect(sendMail).toHaveBeenCalled()
	});

	it("Should not be able to send a link to a inexisting user", async () => {
		await expect(
			sendForgetPasswordMail.execute("sdas@gmail")
		).rejects.toEqual(new AppError("User does not exists"))
	});

	it("Should be able to create a token for the email", async () => {
		const createToken = jest.spyOn(userRepositoriesInMemory, "create")

		const user = await userRepositoriesInMemory.create({
			name: "test",
			email: "test@mail",
			password: "test",
			driver_license: "XXX-XXX"
		})

		await sendForgetPasswordMail.execute(user.email)

		expect(createToken).toHaveBeenCalled();
	})
})