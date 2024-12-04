"use client";

import { useFetchOrdersWithDetails } from "@/hooks/useQuery/useFetchOrders";
import React, { useState } from "react";

const OrdersTable = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  const { data, isLoading, isError } = useFetchOrdersWithDetails(page, limit);

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">خطا در دریافت سفارش‌ها.</div>;

  const { detailedOrders, totalPages } = data || { detailedOrders: [], totalPages: 0 };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌ها</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-xl rounded-lg">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 text-center font-medium">شماره سفارش</th>
              <th className="px-4 py-2 text-center font-medium">کاربر</th>
              <th className="px-4 py-2 text-center font-medium">مبلغ کل</th>
              <th className="px-4 py-2 text-center font-medium">وضعیت تحویل</th>
              <th className="px-4 py-2 text-center font-medium">محصولات</th>
              <th className="px-4 py-2 text-center font-medium">آدرس</th>
            </tr>
          </thead>
          <tbody>
            {detailedOrders.map((order, index) => (
              <tr
                key={order._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b`}
              >
                <td className="px-4 py-2 text-center">{order._id}</td>
                <td className="px-4 py-2 text-center">
                  {`${order.user.firstname} ${order.user.lastname}`}
                </td>
                <td className="px-4 py-2 text-center">تومان {order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      order.deliveryStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.deliveryStatus ? "تحویل داده شده" : "در انتظار"}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <ul style={{ listStyle: "none" }}>
                    {order.products.map((product) => (
                      <li key={product._id}>{product.product.name} (x{product.count})</li>
                    ))}
                  </ul>
                </td>
                <td>{order.user.address}</td>
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

export default OrdersTable;
