import db from "../connectDB.js";
import asyncHandler from "express-async-handler";

export const addToOrder = asyncHandler((req, res) => {
  const { user_id } = req.user;

  const { products, total_price, address_order } = req.body;

  const q =
    "INSERT INTO orders(`user_id`, `total_price`, `address_order`) VALUES (?,?, ?)";
  db.query(q, [user_id, total_price, address_order], (err, data) => {
    if (err) return res.json(err);
    const orderId = data.insertId;
    products.forEach((product) => {
      const q1 =
        "INSERT INTO order_details(`order_id`, `product_id`, `quantity`) VALUES (?,?,?) ";
      db.query(q1, [orderId, product.product_id, product.quantity]);
      const q2 = "UPDATE products SET `stock`= ? WHERE `product_id`= ?";
      db.query(q2, [product.stock - product.quantity, product.product_id]);
    });
    res.status(200).json("Order has been created");
  });
});
export const getAllOrder = asyncHandler(async (req, res) => {
  const q =
    "SELECT * FROM orders INNER JOIN users ON orders.user_id = users.user_id INNER JOIN order_details ON orders.order_id = order_details.order_id INNER JOIN products ON order_details.product_id = products.product_id ORDER BY orders.order_date";
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

export const statistical = asyncHandler(async (req, res) => {
  const q =
    "SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total_price) AS total_revenue FROM orders GROUP BY DATE_FORMAT(order_date, '%Y-%m')";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});
