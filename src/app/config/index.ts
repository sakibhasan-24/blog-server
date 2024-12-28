import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join((process.cwd(), ".env")),
});
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URL,
  defaultPassword: process.env.DEFAULT_PASS,
  saltPass: process.env.SALT_PASS,
  jwt_access_secret: process.env.jwt_access_secret,
  //   jwt_refresh_secret: process.env.jwt_refresh_secret,
  jwt_expiresIn_access: process.env.jwt_expiresIn_access,
  //   jwt_expiresIn_refresh: process.env.jwt_expiresIn_refresh,
};
