const userService = require("../services/user.service");
const ApiError = require("../utils/apiError");

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json({ success: true, data: users });
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(201).json({ success: true, data: user });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User Not Found " });
  }

  return res.status(200).json({ success: true, data: user });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found " });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);

    if (!user) {
      throw new ApiError(404, "User Not Fo und");
    }
    return res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully !" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const result = await userService.loginUser(req.body);

  return res.status(200).json({ success: true, data: result });
};

const getProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.id);

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const result = await userService.toggleFavorite(
      req.user.id,
      req.params.hadithId,
    );

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getProfile,
  getMe,
  toggleFavorite,
};
