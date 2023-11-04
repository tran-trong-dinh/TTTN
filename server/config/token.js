import jwt from "jsonwebtoken";

export const generateToken = (user_id) => {
  return jwt.sign({ user_id }, 'secret');
};
