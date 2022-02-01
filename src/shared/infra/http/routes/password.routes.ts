import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgetPasswordMailController } from "@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";
import { Router } from "express";

const router = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();
const resetPasswordController = new ResetPasswordController()

router.post("/forget", sendForgetPasswordMailController.handle)
router.post("/reset", resetPasswordController.handle)

export { router as passwordRoutes }