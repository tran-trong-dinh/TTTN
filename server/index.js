import express from "express";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import promotionRouter from "./routes/promotionRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cors from "cors";
import nodemailer from "nodemailer";
import uploadCloud from "./config/cloudinary.config.js";
// import uploadCloud from "./config/cloudinary.config.js";
const app = express();

dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(cookieParser());
app.use(express.json());

// app.post("/upload", uploadCloud.single("photo"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error("No file uploaded!"));
//     return;
//   }

//   res.json({ secure_url: req.file.path });
// });

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/promotion", promotionRouter);
app.use("/review", reviewRouter);
app.use("/order", orderRouter);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trantrongdinh0221@gmail.com",
    // pass: "kvxktjijicreeaow",
    pass: "kxno kijw hkkk oqjz",
  },
});

// Route to handle form submission
app.post("/send-email", (req, res) => {
  const { fullName, email, subject, message } = req.body;

  // Email content
  const mailOptions = {
    from: email, // Replace with your email (email nguồn)
    to: "trantrongdinh0221@gmail.com", // Replace with the recipient's email
    subject: subject,
    text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.post("/upload", uploadCloud.single("photo"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});

app.use(notFound);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
