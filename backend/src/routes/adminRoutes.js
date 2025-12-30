const express = require("express");
const router = express.Router();

const {
  getUsersWithPagination,
  activateUser,
  deactivateUser,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/users", protect, adminOnly, getUsersWithPagination);
router.patch("/users/:id/activate", protect, adminOnly, activateUser);
router.patch("/users/:id/deactivate", protect, adminOnly, deactivateUser);

module.exports = router;
