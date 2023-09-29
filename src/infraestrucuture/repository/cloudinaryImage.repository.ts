import cloudinary from "cloudinary";
import { ImageUpload } from "../../domain/imageUpload.interface";

export class CloudinaryImageRepository implements ImageUpload {
  async uploadImage(image: Express.Multer.File): Promise<string> {
    const result = await cloudinary.v2.uploader.upload(image.path, {
      folder: "rocketfy",
    });
    return result.secure_url;
  }
}
