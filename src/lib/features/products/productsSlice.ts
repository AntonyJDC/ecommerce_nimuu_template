import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  name: string;
  hex: string;
};

interface ProductsState {
  colorSelection: Color;
  sizeSelection: string;
}

const initialState: ProductsState = {
  colorSelection: {
    name: "",
    hex: "bg-[#4F4631]",
  },
  sizeSelection: "", // Mantener el estado inicial vacío
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setColorSelection: (state, action: PayloadAction<Color>) => {
      state.colorSelection = action.payload;
    },
    setSizeSelection: (state, action: PayloadAction<string>) => {
      state.sizeSelection = action.payload;
    },
  },
});

export const { setColorSelection, setSizeSelection } = productsSlice.actions;

export default productsSlice.reducer;
