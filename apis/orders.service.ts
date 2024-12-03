import { generateAxiosInstance } from './axiosInstance';
import { urls } from '@/utils/urls';

export const fetchOrders = async (page: number = 1, limit: number = 10) => {
  const client = generateAxiosInstance()
  const response = await client.get(urls.orders, {
    params: { page, limit },
  });
  return response.data;
};
