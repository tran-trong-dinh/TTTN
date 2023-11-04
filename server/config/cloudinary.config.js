import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

          
cloudinary.config({ 
  cloud_name: 'dbjejtjkf', 
  api_key: '735126517786277', 
  api_secret: 'ihcXMF-Nn6Xe3A0PjNr4GMU-neM' 
});





const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;
