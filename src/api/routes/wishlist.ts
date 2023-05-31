import express from "express";
const router = express.Router();

import { addToWishlist, getWishlist, updateWishlist } from "../controllers/wishlist";

router.post("/", addToWishlist);
router.get("/", getWishlist);
router.patch("/", updateWishlist);

// module.exports = router;

export default router;
