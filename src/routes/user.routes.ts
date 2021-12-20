import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/useCases/createUser/createUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import { ensureUserIsAuthenticated } from '../middlewares/ensureUserIsAuthenticated';
import uploadConfig from "../config/upload"
import multer from 'multer';

const router = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

router.post("/", createUserController.handle);
router.patch("/avatar", ensureUserIsAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { router as userRoutes }