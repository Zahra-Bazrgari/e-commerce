"use client";

import { useFetchOrdersWithDetails } from "@/hooks/useQuery/useFetchOrders";
import React, { useState } from "react";

const DeliveryTable = () => {
  const page = 1;
  const [filterDelivered, setFilterDelivered] = useState<boolean>(true);

  const { data, isLoading, isError } = useFetchOrdersWithDetails(page);

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">خطا در دریافت سفارش‌ها.</div>;

  const { detailedOrders } = data || { detailedOrders: [] };

  const filteredOrders = detailedOrders.filter(order => order.deliveryStatus === filterDelivered);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌ها</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilterDelivered(true)}
          className={`px-4 py-2 rounded-lg ${
            filterDelivered === true ? "bg-green-100 text-green-900" : "bg-gray-200 text-black"
          }`}
        >
          تحویل داده شده
        </button>
        <button
          onClick={() => setFilterDelivered(false)}
          className={`px-4 py-2 rounded-lg ${
            filterDelivered === false ? "bg-red-100 text-red-900" : "bg-gray-200 text-black"
          }`}
        >
          در انتظار تحویل
        </button>
      </div>

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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  سفارشی یافت نشد
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b`}
                >
                  <td className="px-4 py-2 text-center">{order._id}</td>
                  <td className="px-4 py-2 text-center">
                    {`${order.user?.firstname || ""} ${order.user?.lastname || ""}`}
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
                      {order.products?.map((product) => (
                        <li key={product._id}>{product.product.name} (x{product.count})</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 text-center">{order.user?.address || "نامشخص"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryTable;
