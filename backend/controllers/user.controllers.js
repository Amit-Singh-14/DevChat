import asyncHandler from "express-async-handler";
import { User } from "../models/User.model.js";
import generateToken from "../config/generateToken.js";

const userRegister = asyncHandler(async (req, res) => {
  const { email, name, password, pic } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json("user detail must be present");
    // throw new Error("Please enter all fields.");
  }

  const exisitinguser = await User.findOne({ email });

  if (exisitinguser) {
    return res.status(400).json("User already exits");
    // throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    return res.status(201).json({
      newUser,
      token: generateToken(newUser._id),
    });
  } else {
    return res.status(400).json("Failed to create the User");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json("provide all field.");
    throw new Error("provide all field.");
  }

  const finduser = await User.findOne({ email });
  // console.log(finduser);
  if (finduser && (await finduser.comparePassword(password))) {
    res.status(200).json({
      finduser,
      token: generateToken(finduser._id),
    });
  } else {
    res.status(401).json("Invalid email or password");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search && {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  };

  if (keyword) {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.send(users);
  }
  return res.send("no keyword");
});

export { userRegister, userLogin, getAllUsers };
