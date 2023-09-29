import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
});

export const singleImageUpload = multer({ storage: storage }).single("image");
export const arrayImageUpload = multer({ storage: storage }).array("image");
