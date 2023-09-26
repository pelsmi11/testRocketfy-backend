import { Product } from "./product.entity";

export interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
