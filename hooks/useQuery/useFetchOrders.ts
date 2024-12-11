import { fetchOrderById, fetchOrders } from '@/apis/orders.service';
import { OrderDetails, OrdersResponse } from '@/types/orders.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchOrders = (page: number, limit?: number) => {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrders(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchOrdersWithDetails = (
  page: number,
  limit?: number
) => {
  return useQuery<
    { detailedOrders: OrderDetails[]; totalPages: number },
    Error
  >({
    queryKey: ["ordersWithDetails", page, limit],
    queryFn: async () => {
      const ordersResponse: OrdersResponse = await fetchOrders(page, limit);

      const detailedOrders: OrderDetails[] = await Promise.all(
        ordersResponse.data.orders.map(async (order) => {
          const orderDetailsResponse = await fetchOrderById(order._id);
          return orderDetailsResponse.data.order;
        })
      );

      return {
        detailedOrders,
        totalPages: ordersResponse.total_pages,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
