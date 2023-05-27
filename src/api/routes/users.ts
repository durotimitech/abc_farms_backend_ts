import express from "express";
const router = express.Router();

import { changePassword, createUser, loginUser, resetPassword } from "../controllers/users";

router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/reset-password", resetPassword);
router.patch("/change-password", changePassword);

// router.get("/", [checkAuth, salesman], UsersController.getUsers);

// router.get("/get-admins", [checkAuth, admin], UsersController.getAdmins);

// router.patch("/admin-update-user", [checkAuth, admin], UsersController.adminUpdateUser);

export default router;
