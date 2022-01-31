import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/authenticateUserController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

router.post("/sessions", authenticateUserController.handle)
router.post("/refresh_token", refreshTokenController.handle)


export { router as authenticationRouter }

