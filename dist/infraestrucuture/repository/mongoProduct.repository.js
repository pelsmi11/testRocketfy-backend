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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    sku: String,
    imageUrl: String,
    tags: [String],
    price: Number,
    stock: Number,
    priceHistory: [
        {
            date: Date,
            price: Number,
        },
    ],
    stockHistory: [
        {
            date: Date,
            stock: Number,
        },
    ],
}, {
    timestamps: true,
});
const ProductModel = mongoose_1.default.model("Product", productSchema);
class MongoRepository {
    constructor() {
        mongoose_1.default.connect(process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase");
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductModel.find().exec();
            return products.map((product) => product.toObject());
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel.findById(id).exec();
            if (!product) {
                throw new Error("Product not found");
            }
            return product.toObject();
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new ProductModel(product);
            const savedProduct = yield newProduct.save();
            return savedProduct.toObject();
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add to price and stock history before updating
            const oldProduct = yield this.getProductById(product.id);
            if (oldProduct.price !== product.price) {
                if (!product.priceHistory) {
                    product.priceHistory = [];
                }
                product.priceHistory = [
                    ...oldProduct.priceHistory,
                    {
                        date: new Date(),
                        price: product.price,
                    },
                ];
                // product.priceHistory.push({ date: new Date(), price: product.price });
            }
            if (oldProduct.stock !== product.stock) {
                if (!product.stockHistory) {
                    product.stockHistory = [];
                }
                product.stockHistory = [
                    {
                        date: new Date(),
                        stock: product.stock,
                    },
                    ...oldProduct.stockHistory,
                ];
                // product.stockHistory.push({ date: new Date(), stock: product.stock });
            }
            const updatedProduct = yield ProductModel.findByIdAndUpdate(product.id, product, {
                new: true,
            }).exec();
            if (!updatedProduct) {
                throw new Error("Error updating the product");
            }
            return updatedProduct.toObject();
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new Error("Error deleting the product or product not found");
            }
        });
    }
}
exports.MongoRepository = MongoRepository;
