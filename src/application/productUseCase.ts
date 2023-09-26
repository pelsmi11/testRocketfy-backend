import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async listAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async viewProduct(id: string): Promise<Product> {
    console.log(id);
    return this.productRepository.getProductById(id);
  }

  async addProduct(product: Product): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  async modifyProduct(product: Product): Promise<Product> {
    return this.productRepository.updateProduct(product);
  }

  async removeProduct(id: string): Promise<void> {
    return this.productRepository.deleteProduct(id);
  }
}
