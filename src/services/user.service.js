const User = require("../models/user");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new ApiError(409, "هناك حساب بهذه البيانات موجود بالفعل");
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  const user = await User.create(userData);

  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};
const updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

const loginUser = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(loginData.password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    },
  };
};

const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const toggleFavorite = async (userId, hadithId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const isFavorite = user.favorites.includes(hadithId);

  if (isFavorite) {
    user.favorites = user.favorites.filter((id) => id !== hadithId);
    await user.save();
  } else {
    user.favorites.push(hadithId);
    await user.save();
  }
  return { favorites: user.favorites, isFavorite: !isFavorite };
};
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  toggleFavorite,
};
