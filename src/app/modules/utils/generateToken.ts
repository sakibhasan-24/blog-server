import jwt from "jsonwebtoken";
import config from "../../config";

const generateToken = (user: any) => {
  // console.log(user);
  const token = jwt.sign({ user }, config.jwt_access_secret as string, {
    expiresIn: config.jwt_expiresIn_access,
  });
  return token;
};

export default generateToken;
