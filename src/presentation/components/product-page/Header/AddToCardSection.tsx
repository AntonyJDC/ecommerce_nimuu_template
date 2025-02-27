import CartCounter from "../../ui/CartCounter";
import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";

const AddToCardSection = ({
  data,
  selectedSize,
  selectedColor,
}: {
  data: Product;
  selectedSize: string;
  selectedColor: string;
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed md:relative w-full border-t md:border-none border-base-content/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      <AddToCartBtn data={{ ...data, quantity }} selectedSize={selectedSize} selectedColor={selectedColor} />
    </div>
  );
};

export default AddToCardSection;
