import { StatusCodes } from "http-status-codes";
import { dataSource } from "../../services/database";
import logger from "../../utilities/logger";
import { _response } from "../../utilities/responseHandler";
import { WishList as WishlistEntity } from "../entities";
import { Response } from "express";
import { NotFoundError } from "../../utilities/errors";

export const addToWishlist = async (req: any, res: Response) => {
    logger.info("Initiating add to wishlist process");

    const Wishlist = dataSource.getRepository(WishlistEntity);

    const { wishListItems } = req.body;

    await Wishlist.create({
        user_id: req.userData.userId,
        wishListItems
    }).save()

    return _response(res, StatusCodes.CREATED);
};

export const getWishlist = async (req: any, res: Response) => {
    logger.info("Initiating get wishlist process");

    const Wishlist = dataSource.getRepository(WishlistEntity);

    const wishlists = await Wishlist.find({where:{user_id: req.userData.userId}});

    return _response(res, StatusCodes.OK, wishlists);
};

export const updateWishlist = async (req: any, res: Response) => {
    logger.info("Initiating update wishlist process");

    const Wishlist = dataSource.getRepository(WishlistEntity);

    const { wishListItems } = req.body;

    const wishlist = await Wishlist.findOne({where: {user_id: req.userData.userId}});

    if (!wishlist) {
        throw new NotFoundError("Wishlist not found");
    }

    await Wishlist.update({user_id: req.userData.userId}, {wishListItems});

    return _response(res, StatusCodes.OK);

};