"use client";

import { useEffect } from "react";
import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SizeSelectionProps {
  sizes: string[];
}

const SizeSelection = ({ sizes }: SizeSelectionProps) => {
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  // Seleccionar por defecto el primer tamaño al renderizar
  useEffect(() => {
    if (sizes && sizes.length > 0 && sizeSelection === "") {
      dispatch(setSizeSelection(sizes[0]));
    }
  }, [sizes, sizeSelection, dispatch]);

  if (!sizes || sizes.length === 0) return null;

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
            className={cn(
              "bg-[#F0F0F0] text-black/70 flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px] transition-all",
              sizeSelection === size
                ? "bg-primary text-white font-semibold"
                : "hover:bg-primary/10"
            )}
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
