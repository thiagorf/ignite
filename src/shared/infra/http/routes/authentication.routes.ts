import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/authenticateUserController';

const router = Router();

const authenticateUserController = new AuthenticateUserController()

router.post("/sessions", authenticateUserController.handle)


export { router as authenticationRouter }

