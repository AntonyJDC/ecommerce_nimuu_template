import { useState } from "react";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";

const AddToCartBtn = ({ data }: { data: Product }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const [quantity] = useState(1);
  const isOutOfStock = data.stock === 0;

  const calculateDiscountedPrice = () => {
    if (data.discount.percentage > 0) {
      return Math.round(data.price - (data.price * data.discount.percentage) / 100);
    }if (data.discount.amount > 0) {
      return data.price - data.discount.amount;
    }
    return data.price;
  };

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity <= data.stock) {
      const size = data.sizes.length > 0 ? sizeSelection : "N/A";
      const color = data.colors.length > 0 ? colorSelection.name : "N/A";
      const finalPrice = calculateDiscountedPrice();

      dispatch(
        addToCart({
          id: data.id,
          name: data.title,
          srcUrl: data.srcUrl,
          price: finalPrice, // Precio con descuento aplicado
          attributes: [size, color],
          discount: data.discount,
          quantity: data.quantity ? data.quantity : quantity,
        })
      );
    }
  };

  return (
    <button
      type="button"
      className={`bg-primary w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-primary-content hover:scale-105 transition-all ${
        isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
