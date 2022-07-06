import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSignIn, validateSignUp } from "../middlewares/authMiddleware.js";

const authRouter = new Router();

authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", validateSignIn, signIn);

export default authRouter;