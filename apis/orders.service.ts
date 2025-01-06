import { OrderDetailsResponse, OrdersResponse } from "@/types/orders.type";
import { generateAxiosInstance } from "./axiosInstance";
import { urls } from "@/utils/urls";
import { getUserInfo } from "@/utils/user-manager";
import { fetchCart } from "./cart/cart.service";

export const fetchOrders = async (
  page = 1,
  limit = 10
): Promise<OrdersResponse> => {
  const client = generateAxiosInstance();
  const response = await client.get<OrdersResponse>(urls.orders, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchOrderById = async (
  orderId: string
): Promise<OrderDetailsResponse> => {
  const client = generateAxiosInstance();
  const response = await client.get<OrderDetailsResponse>(
    `${urls.orders}/${orderId}`
  );
  return response.data;
};

export interface Product {
  product: string;
  count: number;
  _id: string;
}

export interface Order {
  user: string;
  products: Product[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
}

export const createOrder = async () => {
  try {
    const userInfo = getUserInfo();
    if (!userInfo || !userInfo.userId) {
      throw new Error("User information is missing. Please log in again.");
    }

    const deliveryDateISO = localStorage.getItem("deliveryDate");
    if (!deliveryDateISO) {
      throw new Error("Delivery date is missing. Please select a delivery date.");
    }

    const cartData = await fetchCart();
    if (!Array.isArray(cartData.items) || cartData.items.length === 0) {
      throw new Error("Cart is empty. Add items to the cart before placing an order.");
    }

    const products = cartData.items.map((item) => ({
      product: item._id,
      count: item.quantity,
    }));

    const orderPayload = {
      user: userInfo.userId,
      products,
      deliveryDate: deliveryDateISO,
    };

    const client = generateAxiosInstance();
    const response = await client.post(urls.orders, orderPayload);

    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};
