"use client";

import React, { useState } from "react";
import ProductsCard from "@/components/products/ProductsCard";
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import Pagination from "@/components/Pagination";
import Sort from "@/components/controllers/Sort";
import FilterButton from "@/components/controllers/InStockFilter";

interface ProductsContainerProps {
  categoryId?: string;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({
  categoryId,
}) => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{
    key: string | null;
    value?: number;
  }>({
    key: null,
  });

  const { data, isLoading, isError } = useFetchProducts({
    page,
    limit: 10,
    sort,
    quantity:
      quantityFilter.key && quantityFilter.value !== undefined
        ? { [quantityFilter.key]: quantityFilter.value }
        : undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>مشکلی در دریافت محصولات پیش آمده.</div>;

  const products = categoryId
    ? data?.data.products.filter((product) => product.category === categoryId)
    : data?.data.products;

  if (!products || products.length === 0) {
    return (
      <div className='w-screen h-screen flex items-center justify-center font-bold'>
        هیچ محصولی یافت نشد.
      </div>
    );
  }

  return (
    <div className='p-8 pt-24'>
      <div className='flex flex-col md:flex-row gap-1 md:gap-3 items-center'>
        <Sort setSort={setSort} />
        <FilterButton
          showInStock={
            quantityFilter.key === "gte" && quantityFilter.value === 1
          }
          setQuantityFilter={setQuantityFilter}
        />
      </div>

      <div className='w-full flex justify-center my-4'>
        <span className='bg-gray-200 h-[1.2px] w-[90%]'></span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products.map((product) => (
          <ProductsCard key={product._id} {...product} />
        ))}
      </div>

      <Pagination
        currentPage={data?.page || 1}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductsContainer;
