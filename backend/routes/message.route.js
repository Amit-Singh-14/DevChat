import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
