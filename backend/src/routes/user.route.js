import { Router } from "express";
import {
  checkAuth,
  getCookie,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/user.controller.js";
import { userAuthentication } from "../middlewares/user.middlware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", userAuthentication, logout);
router.get("/cookie", getCookie);

router.put("/updateProfile", userAuthentication, updateProfile);

router.get("/check", userAuthentication, checkAuth);

export default router;
