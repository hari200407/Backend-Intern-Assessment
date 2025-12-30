const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMe = async (req, res) => {
  if (req.user.status === "inactive") {
    res.status(403);
    throw new Error("Account is deactivated");
  }

  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
    },
  });
};


#sign up

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    },
  });
};


#login
user.lastLogin = new Date();
await user.save();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  if (user.status === "inactive") {
    res.status(403);
    throw new Error("Account is deactivated");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    },
  });
};


#logout

const logout = async (req, res) => {
  if (req.user.status === "inactive") {
    res.status(403);
    throw new Error("Account is deactivated");
  }

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};



#update profile

const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  if (req.user.status === "inactive") {
    res.status(403);
    throw new Error("Account is deactivated");
  }

  if (!fullName || !email) {
    res.status(400);
    throw new Error("Full name and email are required");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  const emailExists = await User.findOne({
    email,
    _id: { $ne: req.user._id },
  });

  if (emailExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  req.user.fullName = fullName;
  req.user.email = email;
  await req.user.save();

  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
    },
  });
};



#change password

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (req.user.status === "inactive") {
    res.status(403);
    throw new Error("Account is deactivated");
  }

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Old and new passwords are required");
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const isMatch = await bcrypt.compare(oldPassword, req.user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Old password is incorrect");
  }

  req.user.password = await bcrypt.hash(newPassword, 10);
  await req.user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};



module.exports = {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
};


