export interface ImageUpload {
  uploadImage(image: Express.Multer.File): Promise<string>;
}
