import { Request, Response } from "express";
import { ProductUseCase } from "../../application/productUseCase";

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async listAllProducts(_req: Request, res: Response) {
    try {
      const products = await this.productUseCase.listAllProducts();
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
      console.log({ message: "hola", body: req.body });
      const updatedProduct = await this.productUseCase.modifyProduct(req.body);
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
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
