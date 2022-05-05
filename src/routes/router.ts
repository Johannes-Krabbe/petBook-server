import { Router } from "express";

//controllers
import { indexController } from "../controllers/indexController";
import { petController } from "../controllers/petController";
import { postController } from "../controllers/postController";
import { userController } from "../controllers/userController";


const router = Router();

router.use("/", indexController);
router.use("/user/", userController);
router.use("/pet/", petController);
router.use("/post/", postController);

export default router;
