import { Router } from "express";
import { ImageController } from "../controller/image.controller";
import { CloudinaryImageRepository } from "../repository/cloudinaryImage.repository";
import { ImageUploadService } from "../../application/imageUploadService";
import { arrayImageUpload } from "../middlewares/imageUpload.middleware";

const route = Router();

const cloudinaryRepo = new CloudinaryImageRepository();
const imageService = new ImageUploadService(cloudinaryRepo);
const imageController = new ImageController(imageService);

route.post(
  "/upload",
  arrayImageUpload,
  imageController.uploadImage.bind(imageController)
);

export default route;
