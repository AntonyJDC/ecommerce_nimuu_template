import { useEffect } from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";
import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/redux";
import colorsData from "public/colors.json"; // Importar el JSON de colores

// ✅ Filtrar colores válidos desde el JSON
const mapProductColors = (colorNames: string[]) => {
  return colorNames
    .map((colorName) => {
      const color = colorsData.find(
        (c) => c.name.toLowerCase() === colorName.toLowerCase()
      );
      if (color) {
        return {
          name: color.name,
          hex: color.hex,
        };
      }
      return null;
    })
    .filter((color): color is { name: string; hex: string } => color !== null);
};

const Header = ({ data }: { data: Product }) => {
  const dispatch = useAppDispatch();

  // ✅ Seleccionar el primer tamaño al cargar el componente
  useEffect(() => {
    if (data.sizes.length > 0) {
      dispatch(setSizeSelection(data.sizes[0]));
    }
  }, [data.sizes, dispatch]);

  // ✅ Filtrar los colores disponibles
  const availableColors = mapProductColors(data.colors ?? []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <PhotoSection data={data} />
      </div>
      <div>
        <h1
          className={cn([
            "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
          ])}
        >
          {data.title}
        </h1>
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-base-content text-2xl sm:text-[32px]">
            ${data.price}
          </span>
        </div>
        <p className="text-sm sm:text-base text-base-content/60 mb-5">
          {data.description}
        </p>
        <hr className="h-[1px] border-t-base-content/10 my-5" />
        <p className="text-base-content/60">
          <span className="font-bold text-base-content">Stock: </span> {data.stock}
        </p>
        <hr className="h-[1px] border-t-base-content/10 my-5" />
        {availableColors.length > 0 ? (
          <ColorSelection availableColors={availableColors} />
        ) : (
          <span className="font-medium text-[10px] sm:text-xs">
            Este producto no tiene colores disponibles
          </span>
        )}
        <hr className="h-[1px] border-t-base-content/10 my-5" />
        {data.sizes.length > 0 ? (
          <SizeSelection sizes={data.sizes} />
        ) : (
          <span className="font-medium text-[10px] sm:text-xs">
            Este producto no tiene tamaños disponibles
          </span>
        )}
        <hr className="hidden md:block h-[1px] border-t-base-content/10 my-5" />
        <AddToCardSection data={data} />
      </div>
    </div>
  );
};

export default Header;
