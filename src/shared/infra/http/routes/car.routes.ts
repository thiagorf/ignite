import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { Router } from "express";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const router = Router();

const createCarController = new CreateCarController();

/**
 * testar no insomnia logando o usuario criado na seed
 */
router.post("/", ensureUserIsAuthenticated, ensureUserIsAdmin, createCarController.handle);

export { router as carRoutes }