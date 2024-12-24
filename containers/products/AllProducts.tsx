"use client";

import React, { useState } from "react";

import Sort from "@/components/Sort";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";

import { useFetchProducts } from '@/hooks/useQuery/useFetchProducts';
import FilterButton from '@/components/InStockFilter';

const ProductsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{ key: string | null; value?: number }>({
    key: null,
  });

  const { data, isLoading, isError } = useFetchProducts({
    page,
    limit: 10,
    sort,
    quantity: quantityFilter.key && quantityFilter.value !== undefined ? { [quantityFilter.key]: quantityFilter.value } : undefined,
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در بارگیری محصولات</div>;

  return (
    <div className="p-8 pt-24">
      <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center">
        <Sort setSort={setSort} />
      <FilterButton
        showInStock={quantityFilter.key === "gte" && quantityFilter.value === 1}
        setQuantityFilter={setQuantityFilter}
      />
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data?.data.products.map((product) => (
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

export default ProductsPage;
