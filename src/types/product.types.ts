export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  quantity: number | undefined;
  attributes: any;
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};
