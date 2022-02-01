import { IMailProvider } from "../IMailprovider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		this.createAccount()
	}

	private async createAccount() {
		try {
			let account = await nodemailer.createTestAccount()
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass
				}
				})

			this.client = transporter;
				
		} catch (error) {
			console.log(error)
		}
	}

	async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

		if(!this.client) {
			await this.createAccount()
		}
		
		const templateFile = fs.readFileSync(path).toString("utf-8")

		const templateParse = handlebars.compile(templateFile)

		const templateHTML = templateParse(variables)

		const message = await this.client.sendMail({
			to,
			from: "Rentx <noreplay@rentx.com.br>",
			subject,
			html: templateHTML
		})

		console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

export { EtherealMailProvider }