"use client";
import ProductsCard from "@/components/ProductsCard";
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import React, { useState } from "react";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import Pagination from '@/components/Pagination';

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{
    key?: string;
    value?: number;
  }>({});

  const { data, isLoading, isError } = useFetchProducts({
    page: 1,
    sort,
    quantity:
      quantityFilter.key !== undefined
        ? {
            [quantityFilter.key === "eq" ? "" : quantityFilter.key]:
              quantityFilter.value || 0,
          }
        : undefined,
  });

  const totalPages = data?.total_pages || 1;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className='p-3'>
      <h1 className='font-bold mb-2 text-2xl'>لیست محصولات</h1>

      <div className='flex items-center gap-10 my-4'>
        <Sort setSort={setSort} />
        <Filter setQuantityFilter={setQuantityFilter} />
      </div>

      {/* <div className='mb-4'>
        <button
          className={`px-4 py-2 mr-2 ${
            !sort ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSortChange(undefined)}
        >
          No Sort
        </button>
        <button
          className={`px-4 py-2 mr-2 ${
            sort === "price" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSortChange("price")}
        >
          Price Ascending
        </button>
        <button
          className={`px-4 py-2 ${
            sort === "-price" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSortChange("-price")}
        >
          Price Descending
        </button>
      </div> */}

      {/* <div className='mb-4'>
        <div className='mb-2'>
          <label htmlFor='quantity-slider' className='block font-medium'>
            Quantity: {quantityValue}
          </label>
          <input
            id='quantity-slider'
            type='range'
            min={1}
            max={10}
            value={quantityValue}
            onChange={(e) => setQuantityValue(Number(e.target.value))}
            className='w-full'
          />
        </div>

        <div>
          <button
            className={`px-4 py-2 mr-2 ${
              !quantityKey ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange(undefined)}
          >
            No Filter
          </button>
          <button
            className={`px-4 py-2 mr-2 ${
              quantityKey === "" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange("")}
          >
            Equal
          </button>
          <button
            className={`px-4 py-2 mr-2 ${
              quantityKey === "lt" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange("lt")}
          >
            Less Than
          </button>
          <button
            className={`px-4 py-2 mr-2 ${
              quantityKey === "lte" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange("lte")}
          >
            Less Than or Equal
          </button>
          <button
            className={`px-4 py-2 mr-2 ${
              quantityKey === "gt" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange("gt")}
          >
            Greater Than
          </button>
          <button
            className={`px-4 py-2 ${
              quantityKey === "gte" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleQuantityKeyChange("gte")}
          >
            Greater Than or Equal
          </button>
        </div>
      </div> */}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {data?.data.products.map((product) => (
          <ProductsCard
            key={product._id}
            _id={product._id}
            brand={product.brand}
            category={product.category}
            description={product.description}
            subcategory={product.slugname}
            quantity={product.quantity}
            images={product.images}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductList;
