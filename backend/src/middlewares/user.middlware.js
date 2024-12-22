import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ErrorResponse } from "../utils/errorResp.js";
import asyncHandler from "../utils/asyncHandler.js";
import ENV from "../configs/ENV.js";

//Authenticate User
const userAuthentication = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw ErrorResponse.unauthorized("No token received");
  }
  const decodedJWT = jwt.verify(token, ENV.JWT_SECRET);
  if (!decodedJWT) throw ErrorResponse.unauthorized("Invalid Token");

  let user = await User.findById(decodedJWT.userId).select("-password");
  if (!user) throw ErrorResponse.notFound("Invalid token user not found.");

  req.user = user;

  return next();
});

export { userAuthentication };
