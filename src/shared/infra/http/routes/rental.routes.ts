import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const router = Router();

const rentalController = new CreateRentalController();


router.post("/", ensureUserIsAuthenticated, rentalController.handle)

export { router as rentalRoutes }