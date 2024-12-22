import { Router } from "express";
import { userAuthentication } from "../middlewares/user.middlware.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/allUsers", userAuthentication, getAllUsers);
router.get("/:id", userAuthentication, getMessages);
router.post("/send/:id", userAuthentication, sendMessage);

export default router;
