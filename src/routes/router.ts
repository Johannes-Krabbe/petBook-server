import { Router } from "express";
import { petController } from "../controllers/petController";
import { indexController } from "../controllers/indexController";
import { userController } from "../controllers/userController";

const router = Router();

router.use("/", indexController);
router.use("/user/", userController);
router.use("/pet/", petController);

export default router;
