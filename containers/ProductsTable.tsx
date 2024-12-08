"use client";

import React, { useState } from "react";
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import { IProduct } from '@/types/fetchProducts.types';


const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{ key: string; value: number } | null>(null);

  const limit = 10;

  const quantity = quantityFilter !== null ? { [quantityFilter.key]: quantityFilter.value } : undefined;

  const { data, isLoading, isError } = useFetchProducts({
    page,
    limit,
    sort,
    quantity,
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">خطا در دریافت محصولات.</div>;

  const products = data?.data.products || [];
  const totalPages = data?.total_pages || 1;

  const columns = [
    { label: "نام محصول", render: (product: IProduct) => product.name },
    { label: "قیمت", render: (product: IProduct) => product.price },
    { label: "موجودی", render: (product: IProduct) => product.quantity },
    {
      label: "وضعیت",
      render: (product: IProduct) => (
        <span
          className={`${
            product.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          } rounded-md px-2`}
        >
          {product.quantity > 0 ? "موجود" : "ناموجود"}
        </span>
      ),
    },
    { label: "برند", render: (product: IProduct) => product.brand },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      <div className="flex gap-4 mb-4">
        <Sort setSort={setSort} />
        <Filter setQuantityFilter={setQuantityFilter} />
      </div>

      <Table
        data={products}
        columns={columns}
        noDataMessage="هیچ محصولی یافت نشد"
        rowKey={(product) => product._id}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ProductsTable;
