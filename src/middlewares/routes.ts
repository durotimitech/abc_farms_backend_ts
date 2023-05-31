import express from "express";
const router = express.Router();

import { pingServer } from "../api/controllers/ping";
import { ordersRoutes, productsRoutes, usersRoutes, wishlistRoutes } from "../api/routes";

router.get(`/ping`, pingServer);
router.use("/api/users", usersRoutes);
router.use("/api/products", productsRoutes);
// router.use("/api/carts", cartsRoute);
router.use("/api/wishlist", wishlistRoutes);
router.use("/api/orders", ordersRoutes);

export default router;
