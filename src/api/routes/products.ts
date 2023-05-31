import express from "express";
const router = express.Router();

import { getProducts, getSingleProduct, postProduct, updateProduct } from "../controllers/products";

router.post("/", postProduct);
router.get("/", getProducts);
router.get("/", getSingleProduct);
router.patch("/:id",updateProduct);

export default router;
