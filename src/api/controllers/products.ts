import { StatusCodes } from "http-status-codes";
import { dataSource } from "../../services/database";
import logger from "../../utilities/logger";
import { _response } from "../../utilities/responseHandler";
import {Product as ProductEntity} from "../entities";
import { Response } from "express";
import { NotFoundError } from "../../utilities/errors";

// (POST) save a new product
export const postProduct = async (req: any, res: Response) => {
    logger.info("Initiating post product process");

    const Product = dataSource.getRepository(ProductEntity);

    const { productTitle, productPrice, productQuantity, productDescription, productImageUrl } = req.body;

    await Product.create({
        user_id: req.userData.userId,
        productTitle, productPrice, productQuantity, productDescription, productImageUrl}).save()

    return _response(res, StatusCodes.CREATED);
};

// (GET) retrieve all products
export const getProducts = async (_: any, res: Response) => {
    logger.info("Initiating get products process");

    const Product = dataSource.getRepository(ProductEntity);

    const products = await Product.find();

    return _response(res, StatusCodes.OK, products);
};

// (GET) retrieve single product
export const getSingleProduct = async (req: any, res: Response) => {
    logger.info("Initiating get single product process");

    const {id} = req.params;

    const Product = dataSource.getRepository(ProductEntity);

    const product = await Product.findOne({where: {id}});

    return _response(res, StatusCodes.OK, product);
};

// (UPDATE) product
export const updateProduct = async (req: any, res: Response) => {
    logger.info("Initiating update product process");

    const Product = dataSource.getRepository(ProductEntity);

    const {id} = req.params;

    const { productTitle, productPrice, productQuantity, productDescription, productImageUrl } = req.body;

    const product = await Product.findOne({where: {id, user_id: req.userData.userId}});

    if (!product) {
       throw new NotFoundError("Product not found!");
    }

    product.productTitle = productTitle;
    product.productPrice = productPrice;
    product.productQuantity = productQuantity;
    product.productDescription = productDescription;
    product.productImageUrl = productImageUrl;

    await product.save();

    return _response(res, StatusCodes.OK);
};