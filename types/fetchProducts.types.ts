export interface IProduct {
  _id: string;
  category: string;
  subcategory: string | undefined;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail?: string;
  images: string[];
  slugname?: string;
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
