"use client";

import React, { useState } from "react";
import { useFetchOrdersWithDetails } from "@/hooks/useQuery/useFetchOrders";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { OrderDetails } from '@/types/orders.type';


const OrdersTable = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  const { data, isLoading, isError } = useFetchOrdersWithDetails(page, limit);

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">خطا در دریافت سفارش‌ها.</div>;

  const { detailedOrders = [], totalPages = 0 } = data || {};

  const columns = [
    {
      label: "شماره سفارش",
      render: (order: OrderDetails) => order._id,
    },
    {
      label: "کاربر",
      render: (order: OrderDetails) =>
        `${order.user.firstname} ${order.user.lastname}`,
    },
    {
      label: "مبلغ کل",
      render: (order: OrderDetails) => `تومان ${order.totalPrice}`,
    },
    {
      label: "وضعیت تحویل",
      render: (order: OrderDetails) => (
        <span
          className={`px-2 py-1 rounded-md text-sm ${
            order.deliveryStatus
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
    {
      label: "آدرس",
      render: (order: OrderDetails) => order.user.address,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌ها</h1>

      <Table<OrderDetails>
        data={detailedOrders}
        columns={columns}
        rowKey={(order) => order._id}
        noDataMessage="هیچ سفارشی موجود نیست."
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default OrdersTable;
