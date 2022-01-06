import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
	filename: string
}

class UploadCarImageController {

	async handle(request: Request, response: Response): Promise<Response> {

		const { id } = request.params;

		//na middleware do multer deve-se passar exatamente o nome dessa variavel atribuida ou vice-versa.
		const images = request.files as IFiles[];

		const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

		const image_name = images.map(file => file.filename)


		await uploadCarImageUseCase.execute({
			car_id: id,
			image_name
		});

		return response.status(201).send();
	}
}

export { UploadCarImageController }