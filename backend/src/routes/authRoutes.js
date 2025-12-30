const express = require("express");
const router = express.Router();
const { signup, login, getMe, getAllUsers } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
roter.post("/logout",protect,logout);
router.put("/change-password", protect, changePassword);
router.put("/profile", protect, updateProfile);
router.get("/me", protect, getMe);
router.get("/users", protect, adminOnly, getAllUsers);

module.exports = router;
