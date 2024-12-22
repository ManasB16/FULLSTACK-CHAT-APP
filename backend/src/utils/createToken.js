import jwt from "jsonwebtoken";
import ENV from "../configs/ENV.js";

const generateTokenAndSetCookie = (res, userId) => {
  // Generating jwt token
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  //Set JWT as an HTTP only cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV !== "development",
  });

  return token;
};

export default generateTokenAndSetCookie;
