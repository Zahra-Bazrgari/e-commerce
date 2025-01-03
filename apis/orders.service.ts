import { OrderDetailsResponse, OrdersResponse } from '@/types/orders.type';
import { generateAxiosInstance } from './axiosInstance';
import { urls } from '@/utils/urls';

export const fetchOrders = async (page= 1, limit= 10): Promise<OrdersResponse> => {
  const client = generateAxiosInstance();
  const response = await client.get<OrdersResponse>(urls.orders, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchOrderById = async (orderId: string): Promise<OrderDetailsResponse> => {
  const client = generateAxiosInstance();
  const response = await client.get<OrderDetailsResponse>(`${urls.orders}/${orderId}`);
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
export const createOrder = async (order: Order): Promise<OrdersResponse> => {
  const client = generateAxiosInstance();
  const response = await client.post(`${urls.orders}`, order);
  return response.data;
};
