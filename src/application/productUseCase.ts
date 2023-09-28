import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";
import { queryParams } from "../interfaces/queryParams.interface";

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async listAllProducts(queriesParams?: queryParams): Promise<Product[]> {
    return this.productRepository.getAllProducts(queriesParams);
  }

  async viewProduct(id: string): Promise<Product> {
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
