import db from "../connectDB.js";

import asyncHandler from "express-async-handler";

// Category
export const createCategory = asyncHandler((req, res) => {
  const q =
    "INSERT INTO categories(`category_name`, `img_category`) VALUES (?)";
  const values = [req.body.category_name, req.body.img_category];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Category has been created");
  });
});

export const getCategories = asyncHandler((req, res) => {
  const q =
    "SELECT categories.*, COUNT(products.product_id) As total_products FROM categories LEFT JOIN products ON categories.category_id = products.category_id GROUP BY category_id ";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const getCategorie = asyncHandler((req, res) => {
  const q = "SELECT * FROM categories WHERE category_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
});

export const updateCategory = asyncHandler((req, res) => {
  const q =
    "UPDATE categories SET category_name = ?, img_category = ? WHERE category_id = ?";

  db.query(
    q,
    [req.body.category_name, req.body.img_category, req.params.id],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Category has been updated");
    }
  );
});

export const deleteCategory = asyncHandler((req, res) => {
  const q = "DELETE FROM categories WHERE category_id = ?";
  const values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Category has been deleted");
  });
});
