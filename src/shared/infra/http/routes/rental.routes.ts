import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRetal/DevolutionRentalController";
import { Router } from "express";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const router = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()


router.post("/", ensureUserIsAuthenticated, createRentalController.handle)
router.post("/devolution/:id", ensureUserIsAuthenticated, devolutionRentalController.handle)

export { router as rentalRoutes }