import express from "express";
const router = express.Router();

import { changePassword, createUser, getAdmins, getUsers, loginUser, resetPassword, adminUpdateUser } from "../controllers/users";

router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/reset-password", resetPassword);
router.patch("/change-password", changePassword);
router.get("/", getUsers);
router.get("/admins", getAdmins);
router.patch("/admin/user", adminUpdateUser);

export default router;
