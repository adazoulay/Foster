const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).json({ message: "No users Found" });
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const createNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const duplicateUsername = await User.findOne({ username }).lean().exec();
    if (duplicateUsername) {
      return res.status(409).json({ message: "Duplicate username" });
    }
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateEmail) {
      return res.status(409).json({ message: "Duplicate email" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = { username, email, password: hashedPwd };
    const user = await User.create(userObject);

    if (user) {
      res.status(201).json({ messsage: `New user ${username} created` });
    } else {
      res.status(400).json({ message: "Invalid user data recieved" });
    }
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.body.id);

  if (!userId) {
    return res.status(400).json({ message: "User ID Requried" });
  }
  if (!userId.equals(req.user.id)) {
    return res.status(403).json({ message: "You can delete only your account!" });
  }
  try {
    result = await User.findByIdAndDelete(userId);
    await User.updateMany(
      { $or: [{ followers: userId }, { following: userId }] },
      { $pull: { followers: userId, following: userId } }
    );
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
};
