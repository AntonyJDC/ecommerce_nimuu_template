"use client";

import BreadcrumbCart from "./components/cart-page/BreadcrumbCart";
import ProductCard from "./components/cart-page/ProductCard";
import { Button } from "../../components/ui/button";
import InputGroup from "../../components/ui/input-group";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import { RootState } from "../../../lib/store";
import { useAppSelector } from "../../hooks/redux";
import { CartItem } from "@/lib/features/carts/cartsSlice";
import { NavLink } from "react-router-dom";

export default function CartPage() {
  const { cart, totalPrice } = useAppSelector((state: RootState) => state.carts);

  const originalTotalPrice = cart?.items.reduce((acc, item) => {
    const originalPrice = item.discount.percentage > 0
      ? Math.round(item.price / (1 - item.discount.percentage / 100)) // ✅ Precio antes del descuento %
      : item.price + item.discount.amount; // ✅ Precio antes del descuento fijo

    return acc + originalPrice * item.quantity;
  }, 0) || 0;

  const totalDiscount = originalTotalPrice - totalPrice; // ✅ Descuento total aplicado

  const totalDiscountPercentage = originalTotalPrice > 0
    ? Math.round((totalDiscount / originalTotalPrice) * 100) // ✅ Calculamos el porcentaje real
    : 0;


  return (
    <main className="pb-20">
      <div className="container mt-8">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2 className="font-bold text-[32px] md:text-[40px] text-base-content uppercase mb-5 md:mb-6">
              Your Cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-base-content/10">
                {cart.items.map((product: CartItem, idx: React.Key | null | undefined, arr: CartItem[]) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && <hr className="border-t-base-content/10" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-base-content/10">
                <h6 className="text-xl md:text-2xl font-bold text-base-content">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-base-content/60">Subtotal</span>
                    <span className="md:text-xl font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-base-content/60">
                      Discount (-{totalDiscountPercentage}%)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -${Math.round(totalDiscount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-base-content/60">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-base-content/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-base-content">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                      ${Math.round(totalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-primary text-primary-content rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base text-primary-content font-medium bg-primary rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-base-content mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24 text-white" asChild>
              <NavLink to="/shop">Shop</NavLink>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
