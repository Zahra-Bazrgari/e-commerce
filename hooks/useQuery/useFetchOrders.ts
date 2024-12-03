import { fetchOrders } from '@/apis/orders.service';
import { useQuery } from "@tanstack/react-query";


export const useFetchOrders = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrders(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
};
