const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getProfile,
  getMe,
  toggleFavorite,
} = require("../controllers/user.controller");
const asyncMiddleware = require("../middlewares/async.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeMiddleware = require("../middlewares/authorize.middleware");
const validationMiddleWare = require("../middlewares/validation.middleware");
const {
  createUserValidation,
  loginValidation,
} = require("../validators/user.validator");
const express = require("express");

const router = express.Router();

router.get("/", asyncMiddleware(getAllUsers));
router.post(
  "/",
  validationMiddleWare(createUserValidation),
  asyncMiddleware(createUser),
);
router.patch("/favorites/:hadithId", authMiddleware, toggleFavorite);
router.get("/profile", asyncMiddleware(authMiddleware), getProfile);
router.get("/me", authMiddleware, getMe);
router.get("/:id", asyncMiddleware(getUserById));
router.put("/:id", asyncMiddleware(updateUser));
router.delete("/:id", authMiddleware, authorizeMiddleware("admin"), deleteUser);

router.post(
  "/login",
  validationMiddleWare(loginValidation),
  asyncMiddleware(login),
);

module.exports = router;
