import { ImageUpload } from "../domain/imageUpload.interface";

export class ImageUploadService {
  constructor(private readonly imageUpload: ImageUpload) {}

  async uploadImage(image: Express.Multer.File): Promise<string> {
    return this.imageUpload.uploadImage(image);
  }
}
