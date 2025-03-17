import { addToCart } from "@lib/features/carts/cartsSlice";
import { useAppDispatch } from "@hooks/redux";
import { Product } from "@/types/product.types";
import { toast } from "sonner";

interface AddToCartBtnProps {
  data: Product;
  selectedSize: string;
  selectedColor: string;
}

const AddToCartBtn = ({ data, selectedSize, selectedColor }: AddToCartBtnProps) => {
  const dispatch = useAppDispatch();
  const quantity = data.quantity ?? 0;

  // Obtener los datos del tamaño seleccionado
  const sizeDetails = selectedSize && data.sizes[selectedSize] ? data.sizes[selectedSize] : null;

  // Verificar si la talla seleccionada está agotada
  const isOutOfStock = sizeDetails ? sizeDetails.stock === 0 : false;

  const handleAddToCart = () => {
    if (!selectedSize || !sizeDetails) {
      toast.error("Selecciona un tamaño antes de añadir al carrito.");
      return;
    }

    if (data.colors.length > 0 && (!selectedColor || selectedColor === "N/A")) {
      toast.error("Selecciona un color antes de añadir al carrito.");
      return;
    }


    // Validar stock del tamaño seleccionado
    if (isOutOfStock) {
      toast.info("Lo sentimos, este tamaño está agotado.");
      return;
    }

    // Evitar que la cantidad sea mayor que el stock disponible
    if (quantity > sizeDetails.stock) {
      toast.error(`Solo hay ${sizeDetails.stock} unidades disponibles.`);
      return;
    }

    // ✅ Calcular el precio con descuento antes de agregar al carrito
    let finalPrice = sizeDetails.price;
    if (sizeDetails.discount.percentage > 0) {
      finalPrice = Math.round(sizeDetails.price - (sizeDetails.price * sizeDetails.discount.percentage) / 100);
    } else if (sizeDetails.discount.amount > 0) {
      finalPrice = sizeDetails.price - sizeDetails.discount.amount;
    }

    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        size: selectedSize,
        color: selectedColor,
        price: finalPrice, // ✅ Precio final con descuento aplicado
        attributes: [selectedSize, selectedColor],
        discount: sizeDetails.discount, // 🔍 Se mantiene por si se necesita mostrarlo
        quantity: quantity,
      })
    );
  };

  return (
    <button
      type="button"
      className={`bg-primary w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-primary-content hover:scale-105 transition-all ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
        }`}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? "Agotado" : "Añadir al carrito"}
    </button>
  );
};

export default AddToCartBtn;
