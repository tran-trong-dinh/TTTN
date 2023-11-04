import db from "../connectDB.js";
import asyncHandler from "express-async-handler";

export const createReview = asyncHandler(async (req, res) => {
  const { rating, review_text, product_id } = req.body;

  const { user_id } = req.user;

  const q =
    "INSERT INTO reviews(`rating`, `review_text`, `product_id`, `user_id`) VALUES (?)";
  const values = [rating, review_text, product_id, user_id];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Review has been created");
  });
});

export const getReviewsOfProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT reviews.*, users.* FROM reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE product_id = ? ORDER BY review_date DESC";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const q = "DELETE FROM reviews WHERE review_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Review has been deleted");
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const { rating, review_text } = req.body;
  const q =
    "UPDATE reviews SET `rating` = ?, `review_text` = ? WHERE review_id = ?";
  db.query(q, [rating, review_text, req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Review has been updated");
  });
});
