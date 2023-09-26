export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  imageUrl: string;
  tags: string[];
  price: number;
  stock: number;
  priceHistory: PriceHistory[];
  stockHistory: StockHistory[];
}

interface PriceHistory {
  date: Date;
  price: number;
}

interface StockHistory {
  date: Date;
  stock: number;
}
