import { PiTrashFill } from "react-icons/pi";
import CartCounter from "@components/ui/CartCounter";
import { Button } from "@components/ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@lib/features/carts/cartsSlice";
import { useAppDispatch } from "@hooks/redux";
import { NavLink } from "react-router-dom";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start space-x-4">
      <NavLink
        to={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
        className="bg-base-200 rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <img
          src={data.srcUrl}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.name}
        />
      </NavLink>
      <div className="flex w-full self-stretch flex-col">
        <div className="flex items-center justify-between">
          <NavLink
            to={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
            className="text-base-content font-bold text-base xl:text-xl"
          >
            {data.name}
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9 hover:bg-base-200"
            onClick={() =>
              dispatch(
                remove({
                  id: data.id,
                  attributes: data.attributes,
                  quantity: data.quantity,
                  size: data.size,
                })
              )
            }
          >
            <PiTrashFill className="text-xl md:text-2xl text-red-600" />
          </Button>
        </div>
        <div className="-mt-1">
          <span className="text-base-content text-xs md:text-sm mr-1">Size:</span>
          <span className="text-base-content/60 text-xs md:text-sm">
            {data.attributes[0]}
          </span>
        </div>
        <div className="mb-auto -mt-1.5">
          <span className="text-base-content text-xs md:text-sm mr-1">Color:</span>
          <span className="text-base-content/60 text-xs md:text-sm">
            {data.attributes[1]}
          </span>
        </div>
        
        {/* ✅ SECCIÓN DE PRECIOS CORREGIDA */}
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            {/* ✅ Mostramos el precio final sin recalcularlo */}
            <span className="font-bold text-base-content text-xl xl:text-2xl">
              ${data.price}
            </span>

            {/* ✅ Mostrar el precio original tachado si hay descuento */}
            {(data.discount.percentage > 0 || data.discount.amount > 0) && (
              <span className="font-bold text-base-content/40 line-through text-xl xl:text-2xl">
                ${data.discount.percentage > 0
                  ? Math.round(data.price / (1 - data.discount.percentage / 100))
                  : data.price + data.discount.amount}
              </span>
            )}

            {/* ✅ Mostrar la etiqueta de descuento */}
            {data.discount.percentage > 0 ? (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-$${data.discount.amount}`}
              </span>
            ) : null}
          </div>

          {/* ✅ CONTADOR DE CANTIDAD EN EL CARRITO */}
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? dispatch(
                    remove({
                      id: data.id,
                      attributes: data.attributes,
                      quantity: data.quantity,
                      size: data.size
                    })
                  )
                : dispatch(
                    removeCartItem({
                      id: data.id, attributes: data.attributes,
                      size: data.size
                    })
                  )
            }
            isZeroDelete
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
