import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types/fetchProducts.types";

interface CartItem extends IProduct {
  quantity: number;
  maxQuantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalQuantity: number;
}

const loadFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : { cartItems: [], totalItems: 0, totalQuantity: 0 };
  }
  return { cartItems: [], totalItems: 0, totalQuantity: 0 };
};

const initialState: CartState = loadFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity < action.payload.maxQuantity) {
          existingItem.quantity += action.payload.quantity;
          state.totalQuantity += action.payload.quantity;
        }
      } else {
        state.cartItems.push({ ...action.payload });
        state.totalItems += 1;
        state.totalQuantity += action.payload.quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
        state.totalItems -= 1;
      }
    },

    incrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem && existingItem.quantity < existingItem.maxQuantity) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

const saveToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

export const cartMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  saveToLocalStorage(store.getState().cart);
  return result;
};

export default cartSlice.reducer;
