import { Router } from "express";
import authRouter from "./authRouter.js";
import financesRouter from "./financesRouter.js";

const router = new Router();

router.use(authRouter);
router.use(financesRouter)

export default router;