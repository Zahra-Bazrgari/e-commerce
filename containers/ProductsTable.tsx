"use client";
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
    <div>
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      <div className="flex gap-4 mb-4">
        <Sort setSort={setSort} />
        <Filter setQuantityFilter={setQuantityFilter} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-2xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center font-medium">نام محصول</th>
              <th className="px-4 py-2 text-center font-medium">قیمت</th>
              <th className="px-4 py-2 text-center font-medium">موجودی</th>
              <th className="px-4 py-2 text-center font-medium">وضعیت</th>
              <th className="px-4 py-2 text-center font-medium">برند</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b`}
              >
                <td className="px-4 text-center py-2">{product.name}</td>
                <td className="px-4 text-center py-2">{product.price}</td>
                <td className="px-4 text-center py-2">{product.quantity}</td>
                <td className="px-4 text-center py-2">
                  <span
                    className={`${
                      product.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } rounded-md px-2`}
                  >
                    {product.quantity > 0 ? "موجود" : "ناموجود"}
                  </span>
                </td>
                <td className="px-4 text-center py-2">{product.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-full border transition-all text-sm ${
              page === index + 1
                ? " text-bs-blue shadow-md font-bold "
                : " text-bs-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      )}
    </div>
  );
};

export default ProductsTable;
