import { useAppSelector } from "../hooks/redux";
import { RootState } from "../../lib/store";
import { Link } from "react-router-dom";

const CartBtn = () => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link to="/cart" className="relative mr-[14px] p-1">
      <img
        src="/icons/cart.svg"
        height={100}
        width={100}
        alt="cart"
        className="max-w-[22px] max-h-[22px]"
      />
      {cart && cart.totalQuantities > 0 && (
        <span className="border bg-base-200 text-base-content rounded-full w-fit-h-fit px-1 text-xs absolute -top-3 left-1/2 -translate-x-1/2">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
