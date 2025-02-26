export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  quantity: number | undefined;
  stock: number;
  attributes: any;
  id: number;
  title: string;
  description: string;
  srcUrl: string;
  colors: string[];
  sizes: string[];
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};
