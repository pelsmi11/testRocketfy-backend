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
exports.ProductUseCase = void 0;
class ProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    listAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getAllProducts();
        });
    }
    viewProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getProductById(id);
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.createProduct(product);
        });
    }
    modifyProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.updateProduct(product);
        });
    }
    removeProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.deleteProduct(id);
        });
    }
}
exports.ProductUseCase = ProductUseCase;
