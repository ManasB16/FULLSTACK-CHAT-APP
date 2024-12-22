import cloudinary from "../libs/cloudinary.js";
import { getReceiverSocketId, io } from "../libs/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorResp.js";
import { SuccessResponse } from "../utils/successResp.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user._id;
  const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
    "-password"
  );

  return SuccessResponse.ok(
    res,
    "Fetched all user except for logged in user.",
    allUsers
  );
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: receiverId },
      { senderId: receiverId, receiverId: myId },
    ],
  });

  return SuccessResponse.ok(res, "Fetched all messages.", messages);
});

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageUrl;

  if (image) {
    const uploadRes = await cloudinary.uploader.upload(image);
    imageUrl = uploadRes.secure_url;
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
    image: imageUrl,
  });
  if (!newMessage)
    throw ErrorResponse.internalServerError("Failed to send message.");

  // handle the realtime logic below with socket.io
  const receiverSocketId = getReceiverSocketId(receiverId);

  if(!receiverId) throw ErrorResponse.internalServerError("Receiver socketId not found.");

  if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

  return SuccessResponse.created(res, "Message sent successfully.", newMessage);
});
