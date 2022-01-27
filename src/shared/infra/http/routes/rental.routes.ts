import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRetal/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const router = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()


router.post("/", ensureUserIsAuthenticated, createRentalController.handle)
router.post("/devolution/:id", ensureUserIsAuthenticated, devolutionRentalController.handle)
router.get("/user", ensureUserIsAuthenticated, listRentalsByUserController.handle)

export { router as rentalRoutes }