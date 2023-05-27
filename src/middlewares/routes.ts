import express from "express";
const router = express.Router();

import { pingServer } from "../api/controllers/ping";
import { usersRoutes } from "../api/routes";

router.get(`/ping`, pingServer);
router.use("/api/users", usersRoutes);
// router.use("/api/products", productsRoute);
// router.use("/api/carts", cartsRoute);
// router.use("/api/wishlist", wishlistRoute);
// router.use("/api/orders", orderRoute);

export default router;
