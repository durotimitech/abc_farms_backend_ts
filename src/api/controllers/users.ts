import { StatusCodes } from "http-status-codes";
import { dataSource } from "../../services/database";
import { BadRequestError, ConflictError } from "../../utilities/errors";
import logger from "../../utilities/logger";
import { _response } from "../../utilities/responseHandler";
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema } from "../../utilities/validation/users";
import jwt from "jsonwebtoken";
import {
  User as UserEntity,
  AuthToken as AuthTokenEntity,
} from "../entities";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  logger.info("Initiating register process");

  const User = dataSource.getRepository(UserEntity);

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

  await User.create({
    email,
    firstname,
    lastname,
    telephone,
    password: hashedPass,
  }).save();

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

// // (GET) retrieve all users
// exports.getUsers = async (req, res, next) => {
//   try {
//     const users = await Queries.selectAllAndOrder({
//       table: "users",
//       orderBy: "createdAt",
//       direction: "DESC",
//     });

//     const result = {
//       count: users.length,
//     };

//     _response({ statusCode: 200, res, result });
//   } catch (e) {
//     _response({ statusCode: 500, res, result: e });
//   }
// };

// // (GET) retrieve all administrators
// exports.getAdmins = async (req, res, next) => {
//   try {
//     const users = await Queries.selectColumnsWith1Operator({
//       table: "users",
//       condition: "accessLevel >1",
//       columns: ["userId", "email", "firstName", "lastName", "accessLevel"],
//     });

//     return _response({ statusCode: 200, res, result: users });
//   } catch (e) {
//     return _response({ statusCode: 500, res, result: e });
//   }
// };

// // (PATCH) Admins updates user
// exports.adminUpdateUser = async (req, res, next) => {
//   try {
//     const data = {
//       accessLevel: req.body.accessLevel,
//       updatedAt: getDate(),
//     };

//     const user = (
//       await Queries.selectAllWith1Condition({
//         table: "users",
//         condition: { email: req.body.email },
//       })
//     )[0];

//     if (!user)
//       return _response({
//         statusCode: 400,
//         res,
//         result: "Email not found!",
//       });

//     await Queries.updateOne({
//       table: "users",
//       data,
//       condition: { email: req.body.email },
//     });

//     return _response({ statusCode: 200, res, result: "success" });
//   } catch (e) {
//     return _response({ statusCode: 500, res, result: e });
//   }
// };

// /*
// CREATE TABLE users (
//   `userId` INT NOT NULL AUTO_INCREMENT,
//   `email` VARCHAR(45) NOT NULL,
//   `firstName` VARCHAR(45) NOT NULL,
//   `lastName` VARCHAR(45) NOT NULL,
//   `password` VARCHAR(100) NOT NULL,
//   `phone` VARCHAR(20) NOT NULL,
//   `isEmailVerified` TINYINT(1) NOT NULL,
//   `accessLevel` INT NOT NULL DEFAULT 1,
//   `verificationCode` INT NOT NULL,
//   `createdAt` DATETIME NOT NULL,
//   `updatedAt` DATETIME NOT NULL,
//   PRIMARY KEY (`userId`));
// */
