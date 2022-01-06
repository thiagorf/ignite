import { CarImage } from "@modules/cars/infra/typeorm/entities/carImage";



interface ICarImageRepositories {
	create(car_id: string, image_name: string): Promise<CarImage>
	findCarImage(carImage_id: string): Promise<CarImage>
	deleteImage(carImage_id: string): Promise<void>
}

export { ICarImageRepositories }