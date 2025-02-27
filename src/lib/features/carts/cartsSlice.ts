import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type RemoveCartItem = {
  id: number;
  size: string; // Ahora especificamos el tamaño del producto a eliminar
  attributes: string[];
};

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  size: string;
  color: string;
  price: number; // ✅ Este ya incluye el descuento aplicado
  attributes: string[];
  discount: Discount;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

// Define el estado inicial
interface CartsState {
  cart: Cart | null;
  totalPrice: number; // ✅ Total con descuento aplicado
  adjustedTotalPrice: number; // ✅ Total ajustado con los productos agregados
  action: "update" | "add" | "delete" | null;
}

// Estado inicial
const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
      } else {
        const isItemInCart = state.cart.items.find(
          (item) =>
            action.payload.id === item.id &&
            action.payload.size === item.size &&
            compareArrays(action.payload.attributes, item.attributes)
        );

        if (isItemInCart) {
          state.cart.items = state.cart.items.map((eachCartItem) => {
            if (
              eachCartItem.id === action.payload.id &&
              eachCartItem.size === action.payload.size &&
              compareArrays(eachCartItem.attributes, isItemInCart.attributes)
            ) {
              return {
                ...isItemInCart,
                quantity: action.payload.quantity + isItemInCart.quantity,
              };
            }
            return eachCartItem;
          });

          state.cart.totalQuantities += action.payload.quantity;
        } else {
          state.cart.items.push(action.payload);
          state.cart.totalQuantities += action.payload.quantity;
        }
      }

      // ✅ Calculamos el total correctamente
      state.totalPrice = state.cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.adjustedTotalPrice = state.totalPrice;
    },
    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (state.cart === null) return;
    
      // Buscar el producto exacto en el carrito
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          action.payload.size === item.size && // ✅ Consideramos el tamaño
          compareArrays(action.payload.attributes, item.attributes)
      );
    
      if (!isItemInCart) return; // ❌ Si el producto no está, salimos
    
      if (isItemInCart.quantity > 1) {
        // ✅ Reducimos la cantidad si hay más de una unidad
        state.cart.items = state.cart.items.map((eachCartItem) => {
          if (
            eachCartItem.id === action.payload.id &&
            eachCartItem.size === action.payload.size &&
            compareArrays(eachCartItem.attributes, isItemInCart.attributes)
          ) {
            return {
              ...isItemInCart,
              quantity: eachCartItem.quantity - 1,
            };
          }
          return eachCartItem;
        });
        state.cart.totalQuantities -= 1;
        state.totalPrice -= isItemInCart.price;
        state.adjustedTotalPrice -= isItemInCart.price;
      } else {
        // ✅ Eliminamos el producto si solo hay una unidad
        state.cart.items = state.cart.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.size === action.payload.size &&
              compareArrays(item.attributes, action.payload.attributes)
            )
        );
        state.cart.totalQuantities -= 1;
        state.totalPrice -= isItemInCart.price;
        state.adjustedTotalPrice -= isItemInCart.price;
      }
    },
    remove: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart.items = state.cart.items.filter(
        (pItem) =>
          pItem.id !== action.payload.id ||
          !compareArrays(pItem.attributes, isItemInCart.attributes)
      );

      state.cart.totalQuantities -= isItemInCart.quantity;

      state.totalPrice = state.cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.adjustedTotalPrice = state.totalPrice;
    },
  },
});

export const { addToCart, removeCartItem, remove } = cartsSlice.actions;
export default cartsSlice.reducer;
