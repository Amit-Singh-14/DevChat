import { Router } from "express";
import { getAllUsers, userLogin, userRegister } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(userRegister).get(protect, getAllUsers);
router.route("/login").post(userLogin);

export default router;
