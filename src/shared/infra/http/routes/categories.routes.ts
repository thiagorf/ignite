import { Router } from 'express';
import multer from 'multer';
import { ensureUserIsAuthenticated } from '../middlewares/ensureUserIsAuthenticated';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController'; 
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '../../../../modules/cars/useCases/listCategories/ListCategoryController';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin';

const routes = Router();
const upload = multer({
	dest: './tmp'
});

//Passar para um arquivo de instanciação?
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

//routes.use(ensureUserIsAuthenticated);
routes.post(
	'/', 
	ensureUserIsAuthenticated, 
	ensureUserIsAdmin,
	createCategoryController.handle
)

routes.get('/', listCategoryController.handle);

routes.post(
	'/import', 
	upload.single('file'), 
	ensureUserIsAuthenticated,
	ensureUserIsAdmin,
	importCategoryController.handle
)

export { routes as categoryRoutes }
