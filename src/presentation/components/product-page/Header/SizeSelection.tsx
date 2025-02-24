"use client";

import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SizeSelectionProps {
  sizes: string[]; // Prop para recibir las tallas del producto
}

const SizeSelection = ({ sizes }: SizeSelectionProps) => {
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  if (!sizes || sizes.length === 0) return null; // No renderizar si no hay tallas

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-base-content/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizes.map((size, index) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            type="button"
            className={cn([
              "bg-[#F0F0F0] text-black/70 flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              sizeSelection === size && "bg-primary font-medium text-primary-content",
            ])}
            onClick={() => dispatch(setSizeSelection(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
