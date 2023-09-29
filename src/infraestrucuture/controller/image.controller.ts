import { Request, Response } from "express";
import { ImageUploadService } from "../../application/imageUploadService";

export class ImageController {
  constructor(private imageService: ImageUploadService) {}

  async uploadImage(req: Request, res: Response) {
    if (!req.files && !req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      let images = Array.isArray(req.files) ? req.files : [req.file];

      const imageUrls = [];
      for (const image of images) {
        if (image) {
          const imageUrl = await this.imageService.uploadImage(image);
          imageUrls.push(imageUrl);
        }
      }

      return res.status(201).json({ imageUrls: imageUrls[0] });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
