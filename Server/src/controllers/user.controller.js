import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/generateAccessToken.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      [username, email, password].some(
        (field) => !field || String(field).trim() === "",
      )
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const isUserExists = await User.findOne({ email: normalizedEmail });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: password.trim(),
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong while registering user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      [email, password].some((field) => !field || String(field).trim() === "")
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid User Credentials",
      });
    }

    const isPasswordCorrect = await user.isPasswordMatch(password.trim());

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid User Credentials",
      });
    }

    const accessToken = generateAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User login Successfully!",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong while login user",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong while logout.",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
