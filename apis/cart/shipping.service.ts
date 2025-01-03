import { urls } from '@/utils/urls';
import axios from "axios";

export type ShippingData = {
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  date: string;
};

export const fetchShippingData = async (): Promise<ShippingData[]> => {
  const response = await axios.get(urls.shipping);
  return response.data;
};

export const saveShippingData = async (data: ShippingData): Promise<void> => {
  await axios.post(urls.shipping, data);
};
