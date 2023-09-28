import mongoose, { FilterQuery } from "mongoose";
import { ProductRepository } from "../../domain/product.repository";
import { Product } from "../../domain/product.entity";
import { queryParams } from "../../interfaces/queryParams.interface";

const productSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  sku: string;
  imageUrl: string;
  tags: string[];
  price: number;
  stock: number;
  priceHistory: { date: Date; price: number }[];
  stockHistory: { date: Date; stock: number }[];
}

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export class MongoRepository implements ProductRepository {
  constructor() {
    mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase"
    );
  }

  async getAllProducts(queriesParams?: queryParams): Promise<Product[]> {
    const query: FilterQuery<ProductDocument> = {};
    if (queriesParams?.searchTerm) {
      query["$or"] = [
        { name: new RegExp(queriesParams.searchTerm, "i") },
        { description: new RegExp(queriesParams.searchTerm, "i") },
      ];
    }

    if (queriesParams?.tags && queriesParams?.tags.length) {
      query["tags"] = { $in: queriesParams.tags };
    }

    if (queriesParams?.minPrice != null) {
      query["price"] = { ...query["price"], $gte: queriesParams.minPrice };
    }

    if (queriesParams?.maxPrice != null) {
      query["price"] = { ...query["price"], $lte: queriesParams.maxPrice };
    }
    const products = await ProductModel.find(query).exec();
    return products.map((product) => product.toObject());
  }

  async getProductById(id: string): Promise<Product> {
    const product = await ProductModel.findById(id).exec();
    if (!product) {
      throw new Error("Product not found");
    }
    return product.toObject();
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = new ProductModel(product);
    const savedProduct = await newProduct.save();
    return savedProduct.toObject();
  }

  async updateProduct(product: Product): Promise<Product> {
    // Add to price and stock history before updating
    const oldProduct = await this.getProductById(product.id);
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
    } else {
      product.priceHistory = oldProduct.priceHistory;
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
    } else {
      product.stockHistory = oldProduct.stockHistory;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      product.id,
      product,
      {
        new: true,
      }
    ).exec();

    if (!updatedProduct) {
      throw new Error("Error updating the product");
    }

    return updatedProduct.toObject();
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await ProductModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error("Error deleting the product or product not found");
    }
  }
}
