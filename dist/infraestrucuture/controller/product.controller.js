"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    listAllProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productUseCase.listAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    viewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield this.productUseCase.viewProduct(id);
                if (!product) {
                    res.status(404).json({ message: "Product not found." });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productUseCase.addProduct(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    modifyProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const productData = Object.assign(Object.assign({}, req.body), { id: productId });
                const updatedProduct = yield this.productUseCase.modifyProduct(productData);
                if (!updatedProduct) {
                    res.status(404).json({ message: "Product not found." });
                    return;
                }
                res.status(200).json(updatedProduct);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.productUseCase.removeProduct(id);
                res.status(200).json({ message: `product id ${id} removed` });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
