import { IProduct } from './fetchProducts.types';

export interface OrderProduct {
  _id: string;
  product: IProduct; 
  count: number;
}

export interface OrderDetails {
  _id: string;
  user: {
    firstname: string;
    lastname: string;
    address?: string;
  };
  deliveryStatus: boolean;
  totalPrice: number;
  products: OrderProduct[];
}
