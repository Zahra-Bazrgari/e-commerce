"use client"
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import React, { useState } from "react";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{
    key: string;
    value: number;
  } | null>(null);

  const limit = 10;

  const quantity =
    quantityFilter !== null
      ? { [quantityFilter.key]: quantityFilter.value }
      : undefined;

  const { data, isLoading, isError } = useFetchProducts({
    page,
    limit,
    sort,
    quantity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  const products = data?.data.products || [];
  const totalPages = data?.total_pages || 1;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex gap-4 mb-4">
        <Sort setSort={setSort} />
        <Filter setQuantityFilter={setQuantityFilter} />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Brand</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded-full border-2 ${
              page === index + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
