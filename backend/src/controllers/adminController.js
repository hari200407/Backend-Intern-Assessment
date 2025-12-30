const User = require("../models/User");


const getUsersWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "active";
    await user.save();

    res.status(200).json({
      message: "User account activated",
      userId: user._id,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "inactive";
    await user.save();

    res.status(200).json({
      message: "User account deactivated",
      userId: user._id,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getUsersWithPagination,
  activateUser,
  deactivateUser,
};
