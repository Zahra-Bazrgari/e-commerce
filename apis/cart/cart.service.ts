import axios from 'axios';
import { IProduct } from '@/types/fetchProducts.types';

export interface CartItem extends IProduct {
  quantity: number;
  maxQuantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
}

const api = axios.create({
  baseURL: '/api/cart',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get<CartResponse>('/');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};

export const addToCart = async (item: CartItem): Promise<{ message: string; item: CartItem }> => {
  try {
    const response = await api.post<{ message: string; item: CartItem }>('/', item);
    return response.data;
  } catch (error: any) {
    console.error('Error adding item to cart:', error.response?.data || error.message);
    throw error;
  }
};

export const updateQuantity = async (
  _id: string,
  quantity: number
): Promise<{ message: string; item: CartItem }> => {
  try {
    const response = await api.patch<{ message: string; item: CartItem }>("/", {
      _id,
      quantity,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating item quantity:", error.response?.data || error.message);
    throw error;
  }
};

export const removeFromCart = async (_id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>('/', {
      data: { _id },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error removing item from cart:', error.response?.data || error.message);
    throw error;
  }
};

export const clearCart = async (): Promise<{ message: string }> => {
  try {
    const response = await api.delete('/', {
      data: { clearAll: true },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error clearing cart:', error.response?.data || error.message);
    throw error;
  }
};
