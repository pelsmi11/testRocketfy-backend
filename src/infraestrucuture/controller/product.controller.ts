import { Request, Response } from "express";
import { ProductUseCase } from "../../application/productUseCase";
import { Product } from "../../domain/product.entity";
import { queryParams } from "../../interfaces/queryParams.interface";

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async listAllProducts(req: Request, res: Response) {
    const maxPrice = req.query.maxPrice
      ? parseFloat(req.query.maxPrice as string)
      : undefined;
    const minPrice = req.query.minPrice
      ? parseFloat(req.query.minPrice as string)
      : undefined;
    const searchTerm = req.query.searchTerm as string;
    let tags: string[] | undefined;
    if (Array.isArray(req.query.tags)) {
      tags = (req.query.tags as string[]).filter(
        (tag) => typeof tag === "string"
      );
    } else if (typeof req.query.tags === "string") {
      tags = [req.query.tags];
    }

    const searchParams: queryParams = {
      maxPrice,
      minPrice,
      searchTerm,
      tags,
    };
    try {
      const products = await this.productUseCase.listAllProducts(searchParams);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async viewProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await this.productUseCase.viewProduct(id);
      if (!product) {
        res.status(404).json({ message: "Product not found." });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async addProduct(req: Request, res: Response) {
    try {
      const product = await this.productUseCase.addProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async modifyProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const productData: Product = {
        ...req.body,
        id: productId,
      };

      const updatedProduct = await this.productUseCase.modifyProduct(
        productData
      );
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found." });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.productUseCase.removeProduct(id);
      res.status(200).json({ message: `product id ${id} removed` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
