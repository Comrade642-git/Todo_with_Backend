import express from "express";
import {  registerUser, loginUser, logoutUser, getmyprofile } from "../Controllers/user.js";
import { Authentication } from "../middlewares/Auth.js"

const router = express.Router();

router.post("/new", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", Authentication, getmyprofile);

export default router;