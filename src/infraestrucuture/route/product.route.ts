import { Router } from "express";
import { ProductController } from "../controller/product.controller";
import { MongoRepository } from "../repository/mongoProduct.repository";
import { ProductUseCase } from "../../application/productUseCase";

const route = Router();

const mongoRepo = new MongoRepository();
const productUseCase = new ProductUseCase(mongoRepo);
const productController = new ProductController(productUseCase);

route.get(
  "/products",
  productController.listAllProducts.bind(productController)
);
route.get(
  "/products/:id",
  productController.viewProduct.bind(productController)
);
route.post("/products", productController.addProduct.bind(productController));
route.put(
  "/products/:id",
  productController.modifyProduct.bind(productController)
);
route.delete(
  "/products/:id",
  productController.removeProduct.bind(productController)
);

export default route;
