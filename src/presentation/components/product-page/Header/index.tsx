import { useEffect, useState } from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";
import { setColorSelection, setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import colorsData from "src/assets/colors.json";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Formateador de moneda en COP sin mostrar "COP"
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
  }).format(price);
};

// ✅ Filtrar colores válidos desde el JSON
const mapProductColors = (colorNames: string[]) => {
  return colorNames
    .map((colorName) => {
      const color = colorsData.find(
        (c) => c.name.toLowerCase() === colorName.toLowerCase()
      );
      if (color) {
        return { name: color.name, hex: color.hex };
      }
      return null;
    })
    .filter((color): color is { name: string; hex: string } => color !== null);
};

// ✅ Componente de animación para cada dígito con recorrido intermedio
const AnimatedDigit = ({
  digit,
  previousDigit,
}: {
  digit: number;
  previousDigit: number;
}) => {
  return (
    <div className="relative w-[20px] h-[30px] overflow-hidden flex justify-center items-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: previousDigit > digit ? -30 : 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: previousDigit > digit ? 30 : -30, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute text-[32px] font-bold items-center text-base-content"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ✅ Componente para mostrar el precio animado con números secuenciales
const AnimatedPrice = ({ price }: { price: number }) => {
  const [prevPrice, setPrevPrice] = useState(price);
  const [displayedDigits, setDisplayedDigits] = useState<
    { newDigit: number; prevDigit: number }[]
  >([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const priceString = formatPrice(price).replace(/\D/g, ""); // ✅ Se eliminan caracteres no numéricos
    const prevPriceString = formatPrice(prevPrice).replace(/\D/g, "");

    setDisplayedDigits(
      priceString.split("").map((digit, index) => ({
        newDigit: Number(digit),
        prevDigit: Number(prevPriceString[index] || "0"),
      }))
    );

    setPrevPrice(price);
  }, [price]);

  return (
    <div className="flex items-center">
      {displayedDigits.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <AnimatedDigit key={index} digit={item.newDigit} previousDigit={item.prevDigit} />
      ))}
    </div>
  );
};

const Header = ({ data }: { data: Product }) => {
  const dispatch = useAppDispatch();

  // ✅ Obtener la lista de tamaños disponibles
  const sizeKeys = Object.keys(data.sizes);

  // ✅ Estado para manejar la talla seleccionada
  const [selectedSize, setSelectedSize] = useState(sizeKeys[0] || "");
  const [animatedPrice, setAnimatedPrice] = useState(0);

  // ✅ Seleccionar el primer tamaño disponible SOLO si no hay uno seleccionado
  useEffect(() => {
    if (sizeKeys.length > 0 && !selectedSize) {
      dispatch(setSizeSelection(sizeKeys[0]));
      setSelectedSize(sizeKeys[0]);
    }
  }, [sizeKeys, selectedSize, dispatch]);

  // ✅ Obtener los datos del tamaño seleccionado
  const sizeDetails = selectedSize ? data.sizes[selectedSize] : null;

  // ✅ Función para obtener el precio con descuento
  const getDiscountedPrice = () => {
    if (!sizeDetails) return 0;

    const { price, discount } = sizeDetails;
    if (discount.percentage > 0) {
      return Math.round(price - (price * discount.percentage) / 100);
    }
    if (discount.amount > 0) {
      return price - discount.amount;
    }
    return price;
  };

  // ✅ Efecto para actualizar el precio con animación
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setAnimatedPrice(getDiscountedPrice());
  }, [selectedSize]);

  // ✅ Filtrar los colores disponibles
  const availableColors = mapProductColors(data.colors ?? []);
  const selectedColor = useAppSelector(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: any) => state.products?.colorSelection?.name || null
  );

  // ✅ Si el producto no tiene colores disponibles, asegurar que se seleccione "N/A"
  useEffect(() => {
    if (availableColors.length === 0) {
      dispatch(setColorSelection({ name: "N/A", hex: "#000000" }));
    }
  }, [availableColors, dispatch]);

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

        {/* ✅ Animación de precio con efecto Flip y formato COP sin "COP" */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-base-content text-2xl sm:text-[32px] flex">
            $<AnimatedPrice price={animatedPrice} />
          </span>

          {/* ✅ Mostrar precio original tachado si hay descuento */}
          {sizeDetails &&
            (sizeDetails.discount.percentage > 0 ||
              sizeDetails.discount.amount > 0) && (
              <motion.span
                key={sizeDetails.price}
                className="text-base-content/40 line-through text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                ${sizeDetails.price}
              </motion.span>
            )}
        </div>

        <p className="text-sm sm:text-base text-base-content/60 mb-5">
          {data.description}
        </p>
        <hr className="h-[1px] border-t-base-content/10 my-5" />
        <p className="text-base-content/60 flex items-center gap-2">
          <span className="font-bold text-base-content">Stock: </span>{" "}
          {sizeDetails?.stock || 0}
          {(!sizeDetails?.stock || sizeDetails?.stock === 0) && (
            <span className="ml-5 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center">
              Agotado
            </span>
          )}
        </p>

        <hr className="h-[1px] border-t-base-content/10 my-5" />

        {/* ✅ Selector de color */}
        {availableColors.length > 0 ? (
          <ColorSelection availableColors={availableColors} />
        ) : (
          <span className="font-medium text-[10px] sm:text-xs">
            Este producto no tiene colores disponibles
          </span>
        )}

        <hr className="h-[1px] border-t-base-content/10 my-5" />

        {/* ✅ Selector de tamaño */}
        {sizeKeys.length > 0 ? (
          <SizeSelection
            sizes={data.sizes}
            selectedSize={selectedSize}
            onSizeChange={(size) => {
              setSelectedSize(size);
            }}
          />
        ) : (
          <span className="font-medium text-[10px] sm:text-xs">
            Este producto no tiene tamaños disponibles
          </span>
        )}

        <hr className="hidden md:block h-[1px] border-t-base-content/10 my-5" />
        <AddToCardSection
          data={data}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
};

export default Header;

