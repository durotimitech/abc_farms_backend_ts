import { AuthToken as AuthTokenEntity } from "../api/entities";
import { dataSource } from "../services/database";
let jwt = require("jsonwebtoken");

const validateToken = async (token: string) => {
  try {
    const AuthToken = dataSource.getRepository(AuthTokenEntity);
    let decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);

    const auth_token = await AuthToken.findOne({ where: { token } });

    if (!auth_token) {
      return false;
    }

    return decoded;
  } catch (err) {
    return false;
  }
};

export default validateToken;
