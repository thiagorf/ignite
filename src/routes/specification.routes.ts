import { Router } from 'express';
import { CreteSpecificationController } from '../modules/cars/useCases/createSpecifications/createSpecificationController';
import { ListSpecificationController } from '../modules/cars/useCases/listSpecification/ListSpecificationController';
const router = Router();

const createSpecificationController = new CreteSpecificationController();
const listSpecificationController = new ListSpecificationController();

router.post('/', createSpecificationController.handle)

router.get('/', listSpecificationController.handle)

export { router as specificationRoutes }