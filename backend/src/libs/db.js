import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorResp.js";
import ENV from "../configs/ENV.js";

export const connectDB = asyncHandler(async () => {
  const connect = await mongoose.connect(ENV.MONGO_URI);
  if (!connect)
    throw ErrorResponse.internalServerError(`MongoDB connection error`);

  console.log(`MongoDB connected ${connect.connection.host}`);
});
