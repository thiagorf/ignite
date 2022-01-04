import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarController";
import { Router } from "express";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const router = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();

/**
 * testar no insomnia logando o usuario criado na seed
 */
router.post("/", ensureUserIsAuthenticated, ensureUserIsAdmin, createCarController.handle);
router.get("/available", listAvailableCarController.handle);
//colocar as duas middlewares
//criar rota no insomnia 
router.post("/specifications/:id", createCarSpecificationController.handle);


export { router as carRoutes }