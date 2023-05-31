import { StatusCodes } from "http-status-codes";
import { dataSource } from "../../services/database";
import { BadRequestError, ConflictError } from "../../utilities/errors";
import logger from "../../utilities/logger";
import { _response } from "../../utilities/responseHandler";
import { adminUpdateUserSchema, changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema } from "../../utilities/validation/users";
import jwt from "jsonwebtoken";
import {
  User as UserEntity,
  AuthToken as AuthTokenEntity,WishList as WishlistEntity,
  UserRoleTypes,
} from "../entities";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  logger.info("Initiating register process");

  const User = dataSource.getRepository(UserEntity);
  const Wishlist = dataSource.getRepository(WishlistEntity);

  const validate = registerSchema.validate(req.body);

  if (validate.error) {
    throw new BadRequestError(validate.error.details[0].message);
  }

  const {
    email,
    firstname,
    lastname,
    telephone,
    password,
  } = validate.value;

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new ConflictError("Email already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const new_user = await User.create({
    email,
    firstname,
    lastname,
    telephone,
    password: hashedPass,
  }).save();

  await Wishlist.create({
    user_id: new_user.id
  }).save()

  return _response(res, StatusCodes.CREATED, {});
};

export const loginUser = async (req: Request, res: Response) => {
  logger.info("Initiating login process");

  const AuthToken = dataSource.getRepository(AuthTokenEntity);
  const User = dataSource.getRepository(UserEntity);

  const validate = loginSchema.validate(req.body);

  if (validate.error) {
    throw new BadRequestError(validate.error.details[0].message);
  }

  const { email, password } = validate.value;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    throw new BadRequestError("Invalid credentials");
  }

  const user_id = user.id;

  const {
    firstname,
    lastname,role
  } = user;


  const tokenData = {
    email,
    user_id,
    firstname,
    lastname,
    role
  };

  let token:string

  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    token = jwt.sign(
      tokenData,
      process.env.JWT_SIGN_KEY!
    );
  } else {
    token = jwt.sign(tokenData, process.env.JWT_SIGN_KEY!, {
      expiresIn: "10h",
    });
  }

  const authToken = await AuthToken.findOne({ where: { user_id } });

  if (!authToken) {
    await AuthToken.create({ user_id, token }).save();
  } else {
    await AuthToken.update({ user_id }, { token });
  }

  return _response(res, StatusCodes.OK, {
    token,
    email,
    firstname,
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  logger.info("Initiating reset password process");

  const User = dataSource.getRepository(UserEntity);

  const validate = forgotPasswordSchema.validate(req.body);
  if (validate.error) {
    throw new BadRequestError(validate.error.details[0].message);
  }

  const { email } = validate.value;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const password = Math.random().toFixed(8).toString().split(".")[1];
  const hashed_Pass = await bcrypt.hash(password, 10);

  user.password = hashed_Pass;
  await user.save();

  return _response(res, StatusCodes.CREATED);
};

export const changePassword = async (req: any, res: Response) => {
  logger.info("Initiating change password process");

  const User = dataSource.getRepository(UserEntity);

  const { email } = req.userData!;

  const validate = changePasswordSchema.validate(req.body);
  if (validate.error) {
    throw new BadRequestError(validate.error.details[0].message);
  }

  const { old_password, new_password } = validate.value;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isValidPass = await bcrypt.compare(old_password, user.password);

  if (!isValidPass) {
    throw new BadRequestError("Invalid credentials");
  }

  if (old_password === new_password) {
    throw new BadRequestError(
      "New password cannot be the same as the old password!"
    );
  }

  const hashedPass = await bcrypt.hash(new_password, 10);

  user.password = hashedPass;
  await user.save();

  return _response(res, StatusCodes.CREATED);
};

export const getUsers = async (_: Request, res: Response) => {
  logger.info("Initiating get users process");

  const User = dataSource.getRepository(UserEntity);

  const users = await User.find({select:["id", "email", "firstname", "lastname"]});

  return _response(res, StatusCodes.OK, users);
};

export const getAdmins = async (_: Request, res: Response) => {
  logger.info("Initiating get admins process");

  const User = dataSource.getRepository(UserEntity);

  const users = await User.find({ where: { role: UserRoleTypes.ADMIN }, select:["id", "email", "firstname", "lastname"] });

  return _response(res, StatusCodes.OK, users);
};

export const adminUpdateUser = async (req: Request, res: Response) => {
  logger.info("Initiating admin update user process");

  const User = dataSource.getRepository(UserEntity);

  const validate = adminUpdateUserSchema.validate(req.body);

  if (validate.error) {
    throw new BadRequestError(validate.error.details[0].message);
  }

  const { email, role } = validate.value;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  user.role = role;
  await user.save();

  return _response(res, StatusCodes.OK);
};