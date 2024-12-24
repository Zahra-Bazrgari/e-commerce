"use client";

import React, { useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import Pagination from "@/components/Pagination";
import Sort from "@/components/Sort";
import FilterButton from '@/components/InStockFilter';


interface ProductsContainerProps {
  categoryId: string;
}

const CategorizedProductsContainer: React.FC<ProductsContainerProps> = ({ categoryId }) => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{ key: string | null; value?: number }>({
    key: null,
  });

  const { data, isLoading, isError } = useFetchProducts({
    page,
    sort,
    quantity: quantityFilter.key && quantityFilter.value !== undefined ? { [quantityFilter.key]: quantityFilter.value } : undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{"Failed to load products."}</div>;

  const filteredProducts = data?.data.products.filter(
    (product) => product.category === categoryId
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className='w-screen h-screen flex items-center justify-center font-bold'>
        هیچ محصولی یافت نشد
      </div>
    );
  }

  return (
    <div className="p-8 pt-24">
      <div className='flex flex-col md:flex-row gap-1 md:gap-3 items-center'>
        <Sort setSort={setSort} />
      <FilterButton
        showInStock={quantityFilter.key === "gte" && quantityFilter.value === 1}
        setQuantityFilter={setQuantityFilter}
      />
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredProducts.map((product) => (
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

export default CategorizedProductsContainer;