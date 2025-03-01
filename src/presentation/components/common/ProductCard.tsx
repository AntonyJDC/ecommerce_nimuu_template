import { Product } from "@/types/product.types";
import { NavLink } from "react-router-dom";
import { useState } from "react";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  // Obtener el primer tamaño disponible como predeterminado
  const defaultSize = Object.keys(data.sizes)[0] || "";
  const [selectedSize] = useState(defaultSize);

  // Obtener datos del tamaño seleccionado
  const sizeDetails = data.sizes[selectedSize];

  const isOutOfStock = Object.values(data.sizes).every((size) => size.stock === 0);

  return (
    <NavLink
      to={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto"
    >
      <div className="relative bg-base-200 rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs lg:text-sm px-3 py-2 rounded-tl-[9px] lg:rounded-tl-[16px] z-10">
            Agotado
          </span>
        )}
        <img
          src={data.srcUrl}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
        />
      </div>

      <strong
        className="text-base-content truncate w-full text-base sm:text-base md:text-md lg:text-lg xl:text-xl"
        title={data.title}
      >
        {data.title}
      </strong>

      {/* Precios y descuentos */}
      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mt-2">
        {sizeDetails?.discount.percentage > 0 ? (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            {`$${Math.round(sizeDetails.price - (sizeDetails.price * sizeDetails.discount.percentage) / 100)}`}
          </span>
        ) : sizeDetails?.discount.amount > 0 ? (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            {`$${sizeDetails.price - sizeDetails.discount.amount}`}
          </span>
        ) : (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            ${sizeDetails.price}
          </span>
        )}

        {sizeDetails?.discount.percentage > 0 && (
          <span className="font-medium text-base-content/40 line-through text-sm xl:text-lg">
            ${sizeDetails.price}
          </span>
        )}
        {sizeDetails?.discount.amount > 0 && (
          <span className="font-medium text-base-content/40 line-through text-sm xl:text-lg">
            ${sizeDetails.price}
          </span>
        )}

        {sizeDetails?.discount.percentage > 0 ? (
          <span className="font-light text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            {`-${sizeDetails.discount.percentage}%`}
          </span>
        ) : (
          sizeDetails?.discount.amount > 0 && (
            <span className="font-light text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-$${sizeDetails.discount.amount}`}
            </span>
          )
        )}
      </div>
    </NavLink>
  );
};

export default ProductCard;
