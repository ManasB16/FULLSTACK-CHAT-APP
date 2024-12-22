import { ErrorResponse } from "../utils/errorResp.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export default class AuthService {
  static async signUpUser(userData) {
    const { fullName, email, password } = userData;
    if (!fullName || !email || !password) {
      throw ErrorResponse.badRequest("Please fill all the required fields.");
    }

    if (password.length < 6)
      throw ErrorResponse.badRequest(
        "Password should be at least 6 characters"
      );

    const user = await User.findOne({ email });
    if (user) throw ErrorResponse.conflict("Email already registered.");

    //Passwrod encryption algorithm
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
