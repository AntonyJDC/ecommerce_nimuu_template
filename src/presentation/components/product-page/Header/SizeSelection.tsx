"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SizeSelectionProps {
  sizes: string[];
  selectedSize: string; // ✅ Ahora recibe el tamaño seleccionado
  onSizeChange: (size: string) => void; // ✅ Ahora recibe la función para cambiar el tamaño
}

const SizeSelection = ({ sizes, selectedSize, onSizeChange }: SizeSelectionProps) => {
  // Seleccionar por defecto el primer tamaño solo si no hay uno seleccionado
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      onSizeChange(sizes[0]);
    }
  }, [sizes, selectedSize, onSizeChange]);

  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-base-content/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={cn(
              "bg-[#F0F0F0] text-black/70 flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px] transition-all",
              selectedSize === size
                ? "bg-primary text-white font-semibold"
                : "hover:bg-primary/40 hover:text-primary-content"
            )}
            onClick={() => {
              onSizeChange(size);
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
