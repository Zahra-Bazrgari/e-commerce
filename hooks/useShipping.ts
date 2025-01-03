import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchShippingData,
  saveShippingData,
  ShippingData,
} from "@/apis/cart/shipping.service";

export const useShippingData = () => {
  return useQuery<ShippingData[], Error>("shippingData", fetchShippingData);
};

export const useSaveShippingData = () => {
  const queryClient = useQueryClient();
  return useMutation(saveShippingData, {
    onSuccess: () => {
      queryClient.invalidateQueries("shippingData");
    },
  });
};
