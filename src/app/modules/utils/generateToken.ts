import jwt from "jsonwebtoken";
import config from "../../config";

const generateToken = (user: any) => {
  const tokenPayload = {
    _id: user._id,
    role: user.role,
  };

  const token = jwt.sign(tokenPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_expiresIn_access,
  });

  return token;
};

export default generateToken;
