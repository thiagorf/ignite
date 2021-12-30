import { Router } from "express";
import { categoryRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from './user.routes';
import { authenticationRouter } from "./authentication.routes";
import { carRoutes } from './car.routes';

const router = Router();


/**
 * Basicamente cria um grupo de routes para a route especificada
 * onde a sub-rota '/' equivale a '/categories' e assim por adiante.
 */
router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carRoutes);
router.use(authenticationRouter);


export { router }
