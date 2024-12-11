export interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface ISubcategory {
  _id: string;
  category: ICategory;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface IFetchSubCategoryResponse {
  status: string;
  data: {
    subcategory: ISubcategory;
  };
}
