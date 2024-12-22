import { ErrorResponse } from "../utils/errorResp.js";
import { SuccessResponse } from "../utils/successResp.js";
import generateTokenAndSetCookie from "../utils/createToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import AuthService from "../services/user.services.js";
import asyncHandler from "../utils/asyncHandler.js";
import cloudinary from "../libs/cloudinary.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const newUser = await AuthService.signUpUser(req.body);

  if (newUser) {
    // //Creating jwt for authentication and setting cookie
    const accessToken = generateTokenAndSetCookie(res, newUser._id);
    let data = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      accessToken,
    };
    return SuccessResponse.created(
      res,
      "Successfully registered new user.",
      data
    );
  } else {
    throw ErrorResponse.internalServerError("Failed to register user.");
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (password.length < 6)
    throw ErrorResponse.badRequest("Password should be at least 6 characters");

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) throw ErrorResponse.badRequest("User not found.");

  //Passwrod comparing algorithm
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    throw ErrorResponse.badRequest("Incorrect credentials.");

  // //Creating jwt for authentication and setting cookie
  const accessToken = generateTokenAndSetCookie(res, user._id);

  let data = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
    accessToken,
  };

  return SuccessResponse.created(res, "Successfully logged in.", data);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  return SuccessResponse.ok(res, "Successfully logged out");
});

export const getCookie = asyncHandler(async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) throw ErrorResponse.notFound("Cookie not found");
  return SuccessResponse.ok(res, "Cookie present", jwt);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;
  if (!profilePic)
    throw ErrorResponse.badRequest("Profile picture is required");

  const uploadResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true }
  );

  return SuccessResponse.created(res, "Profile picture updated.", updatedUser);
});

export const checkAuth = asyncHandler(async (req, res) => {
  return SuccessResponse.ok(res, "User authenticated", req.user);
});
