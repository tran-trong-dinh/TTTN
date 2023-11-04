import db from "../connectDB.js";
import asyncHandler from "express-async-handler";

export const addToOrder = asyncHandler(async (req, res) => {
  const { user_id } = req.user;

  const { products, total_price } = req.body;

  const q = "INSERT INTO orders(`user_id`, `total_price`) VALUES (?,?)";
  await db.query(q, [user_id, total_price], (err, data) => {
    if (err) return res.json(err);
    const orderId = data.insertId;
    products.forEach(async (product) => {
      const q1 =
        "INSERT INTO order_details(`order_id`, `product_id`, `quantity`, `price`) VALUES (?,?,?,?)";
      await db.query(
        q1,
        [
          orderId,
          product.product_id,
          product.quantity,
          product.new_price * product.quantity,
        ],
        (err, data) => {
          if (err) return res.json(err);
        }
      );
    });
    res.status(200).json("Order has been created");
  });
});
export const getAllOrder = asyncHandler(async (req, res) => {
  const q =
    "SELECT *  FROM orders INNER JOIN users ON orders.user_id = users.user_id INNER JOIN order_details ON orders.order_id = order_details.order_id INNER JOIN products ON order_details.product_id = products.product_id  ORDER BY orders.order_date DESC";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    const total = data.length;
    return res.status(200).json(data);
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const q = "DELETE FROM orders WHERE order_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Order has been deleted");
  });
});
