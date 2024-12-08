"use client";

import React, { useState } from "react";
import { useFetchOrdersWithDetails } from "@/hooks/useQuery/useFetchOrders";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { OrderDetails } from '@/types/orders.type';


const DeliveryTable = () => {
  const [page, setPage] = useState(1);
  const [filterDelivered, setFilterDelivered] = useState<boolean>(true);

  const { data, isLoading, isError } = useFetchOrdersWithDetails(page);

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">خطا در دریافت سفارش‌ها.</div>;

  const { detailedOrders, totalPages } = data || { detailedOrders: [], totalPages: 1 };

  const filteredOrders = detailedOrders.filter((order) => order.deliveryStatus === filterDelivered);

  const columns = [
    { label: "شماره سفارش", render: (order: OrderDetails) => order._id },
    { label: "کاربر", render: (order: OrderDetails) => `${order.user.firstname} ${order.user.lastname}` },
    { label: "مبلغ کل", render: (order: OrderDetails) => `تومان ${order.totalPrice}` },
    {
      label: "وضعیت تحویل",
      render: (order: OrderDetails) => (
        <span
          className={`px-2 py-1 rounded-md text-sm ${
            order.deliveryStatus ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {order.deliveryStatus ? "تحویل داده شده" : "در انتظار"}
        </span>
      ),
    },
    {
      label: "محصولات",
      render: (order: OrderDetails) => (
        <ul style={{ listStyle: "none" }}>
          {order.products.map((product) => (
            <li key={product._id}>
              {product.product.name} (x{product.count})
            </li>
          ))}
        </ul>
      ),
    },
    { label: "آدرس", render: (order: OrderDetails) => order.user.address || "نامشخص" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌ها</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilterDelivered(true)}
          className={`px-4 py-2 rounded-lg ${
            filterDelivered ? "bg-green-100 text-green-900" : "bg-gray-200 text-black"
          }`}
        >
          تحویل داده شده
        </button>
        <button
          onClick={() => setFilterDelivered(false)}
          className={`px-4 py-2 rounded-lg ${
            !filterDelivered ? "bg-red-100 text-red-900" : "bg-gray-200 text-black"
          }`}
        >
          در انتظار تحویل
        </button>
      </div>

      <Table
        data={filteredOrders}
        columns={columns}
        noDataMessage="سفارشی یافت نشد"
        rowKey={(order) => order._id}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default DeliveryTable;
