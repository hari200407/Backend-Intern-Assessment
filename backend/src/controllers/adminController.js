const User = require("../models/User");
const mongoose = require("mongoose");

const getUsersWithPagination = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments();

  const users = await User.find()
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        limit,
      },
    },
  });
};


const activateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.status = "active";
  await user.save();

  res.status(200).json({
    success: true,
    message: "User account activated successfully",
  });
};


const deactivateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (req.user._id.toString() === req.params.id) {
    res.status(400);
    throw new Error("Admin cannot deactivate own account");
  }

  user.status = "inactive";
  await user.save();

  res.status(200).json({
    success: true,
    message: "User account deactivated successfully",
  });
};


module.exports = {
  getUsersWithPagination,
  activateUser,
  deactivateUser,
};
