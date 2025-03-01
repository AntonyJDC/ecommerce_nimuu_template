export type Discount = {
  amount: number;
  percentage: number;
};

export type SizeDetail = {
  price: number;
  discount: Discount;
  stock: number;
};

export type Product = {
  quantity: number | undefined;
  stock: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  attributes: any;
  id: number;
  title: string;
  description: string;
  srcUrl: string;
  colors: string[];
  sizes: Record<string, SizeDetail>; // Ahora cada tamaño tiene su propio precio y descuento
  gallery?: string[];
  rating: number;
};
