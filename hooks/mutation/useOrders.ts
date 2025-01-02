import { createOrder, Order } from "@/apis/orders.service";
import { useMutation } from "react-query";

export const useCreateOrder = () => {
  return useMutation((order: Order) => createOrder(order));
};
