export interface OrderProduct {
  product: string;
  count: number;
  _id: string;
}

export interface OrderSummary {
  _id: string;
  user: string;
  products: OrderProduct[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: OrderSummary[];
  };
}


export interface ProductDetails {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

export interface OrderProductDetails {
  product: ProductDetails;
  count: number;
  _id: string;
}

export interface UserDetails {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetails {
  _id: string;
  user: UserDetails;
  products: OrderProductDetails[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailsResponse {
  status: string;
  data: {
    order: OrderDetails;
  };
}