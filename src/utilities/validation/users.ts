import Joi from "@hapi/joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    telephone: Joi.string().required(),
    password: Joi.string().trim().required(),
  });
  
  export const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().trim().required(),
  });
  
  export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
  });
  
  export const changePasswordSchema = Joi.object({
    old_password: Joi.string().trim().required(),
    new_password: Joi.string().trim().required(),
  });
  
  export const adminUpdateUserSchema = Joi.object({
    user_id: Joi.number().required(),
    role: Joi.string().required(),
  });