// API gives strings for prices
export interface APIProduct {
  stock_id: number;
  name: string;
  description: string;
  price: string;
}

export interface Product {
  id?: string;
  stock_id: number;
  name: string;
  description: string;
  price: number;
}

export interface Stock {
  id: number,
  name: string
}
