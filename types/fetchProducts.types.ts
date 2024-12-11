export interface IProduct {
  _id: string;
  category: string;
  subcategory?: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail?: string;
  images: string[];
  slugname?: string;
  rating?: Rating;
  createdAt?: string; 
  updatedAt?: string;
}

export interface IProductsResponse {
  status: "success" | "error";
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: IProduct[];
  };
}

export interface IFetchProductsParams {
  page?: number;
  limit?: number;
  fields?: string;
  sort?: string;
  quantity?: Record<string, number>;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface IAddProducts {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  rating?: Rating;
}
