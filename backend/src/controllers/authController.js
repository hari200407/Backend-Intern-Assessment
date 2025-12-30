const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false });
    }

    const user = await User.create({ fullName, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: { token },
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false });

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: { token },
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

const logout = async (req, res) => {
  res.status(200).json({ success: true });
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    const ok = await bcrypt.compare(oldPassword, user.password);

    if (!ok) return res.status(401).json({ success: false });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
};
