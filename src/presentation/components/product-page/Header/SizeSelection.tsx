"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SizeSelectionProps {
  sizes: { [key: string]: { stock: number } };
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelection = ({ sizes, selectedSize, onSizeChange }: SizeSelectionProps) => {
  const sizeKeys = Object.keys(sizes);

  // Seleccionar por defecto el primer tamaño solo si no hay uno seleccionado
  useEffect(() => {
    if (sizeKeys.length > 0 && !selectedSize) {
      onSizeChange(sizeKeys[0]);
    }
  }, [sizeKeys, selectedSize, onSizeChange]);

  if (!sizeKeys || sizeKeys.length === 0) return null;

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-base-content/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizeKeys.map((size) => {
          const isOutOfStock = sizes[size].stock === 0;

          return (
            <button
              key={size}
              type="button"
              className={cn(
                "relative bg-[#F0F0F0] text-black/70 flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px] transition-all",
                selectedSize === size
                  ? "bg-primary text-white font-semibold"
                  : "hover:bg-primary/40 hover:text-primary-content"
              )}
              onClick={() => onSizeChange(size)}
            >
              {size}
              {isOutOfStock && (
                // biome-ignore lint/style/useSelfClosingElements: <explanation>
                <span className="absolute w-[60%] h-[2px] bg-red-500 inset-0 m-auto transform -rotate-45 pointer-events-none"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelection;
