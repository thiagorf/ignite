import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepositories } from '@modules/cars/repositories/implementations/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
class ImportCategoryUseCase {

	constructor(@inject("CategoryRepository") private categoriesRepositories: ICategoriesRepositories){}

	
	/** 
	 * Basicamente para criar uma promise deve-se chamar o comando "new Promise"
	 * Isto se torna necessario quando uma funcionalidade como "streams"
	 * não entregam todo o conteúdo de uma so vez mas em partes
	 * e por natureza esse retorno de "streams" do node não é assincrono
	*/
	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>
	{
		return new Promise((resolve, reject) => {

			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = []

			const parseFile = parse(); 

			stream.pipe(parseFile);

			parseFile.on('data',  (line) => {
				const [ name, description ] = line;
				categories.push({
					name,
					description
				})
			})
			.on('end', () => {
				fs.promises.unlink(file.path)
				resolve(categories);
			})
			.on('error', (error) => {
				reject(error)
			})

		})
	}

	async execute(file: Express.Multer.File): Promise<void>
	{
		const categories = await this.loadCategories(file)

		categories.map(async category =>  {
			const { name, description } = category;

			const existsCategory = await this.categoriesRepositories.findByName(name);

			if(!existsCategory) {
				 await this.categoriesRepositories.create({name, description});
			}
		})
	}
}

export {  ImportCategoryUseCase }