import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import uploadConfig from '@config/upload';
import { DeleteCarImageController } from "@modules/cars/useCases/deleteCarImage/deleteCarImageController";


const router = Router();

const upload = multer(uploadConfig.upload("./tmp/carImages"))

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();;
const uploadCarImageController = new UploadCarImageController();
const deleteCarImageController = new DeleteCarImageController();

/**
 * testar no insomnia logando o usuario criado na seed
 */
router.post("/", ensureUserIsAuthenticated, ensureUserIsAdmin, createCarController.handle);
router.get("/available", listAvailableCarController.handle);
//colocar as duas middlewares
//criar rota no insomnia 
router.post("/specifications/:id", createCarSpecificationController.handle);
router.post(
	"/images/:id", 
	ensureUserIsAuthenticated, 
	ensureUserIsAdmin, 
	upload.array("images"),
	uploadCarImageController.handle
);
router.delete(
	"/images/:id",
	ensureUserIsAuthenticated,
	ensureUserIsAdmin, 
	deleteCarImageController.handle
);


export { router as carRoutes }