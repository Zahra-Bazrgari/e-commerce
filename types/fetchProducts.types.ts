export interface IProduct {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  rating: number;
}

export interface IFetchProductsResponse {
  status: string; 
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
  quantity?: { [key: string]: number };
}

