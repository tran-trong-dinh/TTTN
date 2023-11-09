import db from "../connectDB.js";

import asyncHandler from "express-async-handler";

// Category
export const createProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    old_price,
    description,
    stock,
    image_url,
    category_id,
    promotion_id,
  } = req.body;
  let new_price;
  if (promotion_id) {
    const q1 = "SELECT * FROM promotions WHERE promotion_id = ?";
    db.query(q1, [promotion_id], (err, data) => {
      if (err) return res.json(err);
      new_price = (old_price * (100 - data[0].discount)) / 100;
      const q =
        "INSERT INTO products(`product_name`, `old_price`, `description`,`stock`, `image_url`, `category_id` , `promotion_id`, `new_price`) VALUES (?)";
      const values = [
        product_name,
        old_price,
        description,
        stock,
        image_url,
        category_id,
        promotion_id,
        new_price,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Product has been created");
      });
    });
  } else {
    new_price = old_price;
    const q =
      "INSERT INTO products(`product_name`, `old_price`, `description`,`stock`, `image_url`, `category_id` , `new_price`) VALUES (?)";
    const values = [
      product_name,
      old_price,
      description,
      stock,
      image_url,
      category_id,
      new_price,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Product has been created");
    });
  }
});

export const getProducts = asyncHandler((req, res) => {
  const q =
    "SELECT products.* , categories.* , promotions.*, COUNT(reviews.product_id) AS total_reviews , AVG(reviews.rating) AS average_rating FROM products INNER JOIN categories ON products.category_id = categories.category_id LEFT JOIN promotions ON products.promotion_id = promotions.promotion_id LEFT JOIN reviews ON products.product_id = reviews.product_id GROUP BY products.product_id ORDER BY create_date DESC";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const getProductsFromCategory = asyncHandler((req, res) => {
  const q = "SELECT * FROM products WHERE category_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const updateProduct = asyncHandler((req, res) => {
  const { id } = req.params;
  const { product_name, old_price, description, image_url } = req.body;
  const q =
    "UPDATE products SET `product_name` = ?, `old_price` = ?, `description` = ?, `image_url` = ? WHERE product_id = ?";

  db.query(
    q,
    [product_name, old_price, description, image_url, id],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Product has been updated");
    }
  );
});

export const deleteProduct = asyncHandler((req, res) => {
  const q = "DELETE FROM products WHERE product_id = ?";
  const values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Product has been deleted");
  });
});

export const getDetailProduct = asyncHandler((req, res) => {
  const q = "SELECT * FROM products WHERE product_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
});

export const getRelatedProducts = asyncHandler((req, res) => {
  const q =
    "SELECT * FROM products WHERE category_id = ? AND product_id != ? ORDER BY create_date DESC  LIMIT 4 ";
  db.query(q, [req.params.category_id, req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

export const search = asyncHandler((req, res) => {
  const q =
    "SELECT products.*, categories.* FROM products INNER JOIN categories ON products.category_id = categories.category_id WHERE product_name LIKE ? OR categories.category_name LIKE ? ORDER BY create_date DESC";
  db.query(q, [`%${req.body.search}%`, `%${req.body.search}%`], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});
