export interface Product {
  stock_id: string;
  name: string;
  description: string;
  price: number;
}

export interface APIProduct {
  stock_id: string;
  name: string;
  description: string;
  price: string;
}
