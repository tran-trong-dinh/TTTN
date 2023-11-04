import db from "../connectDB.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler((req, res) => {
  const q = "SELECT * FROM `users` WHERE `email` = ? OR `username` = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //hash the password and create a user

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(`username`,`email`,`password`, `full_name`, `phone`) VALUES (?)";

    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.full_name,
      req.body.phone,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
});

export const login = asyncHandler((req, res) => {
  // CHECK USERNAME

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    // CHECK PASSWORD

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong email or password");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", generateToken(data[0].user_id), {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
});

export const logout = asyncHandler((req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { user_id } = req.user;
  const { email, full_name, phone, address } = req.body;
  const q =
    "UPDATE users SET `email` = ?, `full_name` = ?, `phone` = ?, `address` = ? WHERE user_id = ?";
  db.query(q, [email, full_name, phone, address, user_id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Profile has been updated");
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const q = "DELETE FROM users WHERE user_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("User has been deleted");
  });
});
