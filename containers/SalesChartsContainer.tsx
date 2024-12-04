"use client";
import React from "react";
import { useFetchOrders } from "@/hooks/useQuery/useFetchOrders";
import { DeliveryStatus, SalesPerDay } from "@/utils/OrdersCharts";
import WeeklyChart from "@/components/charts/WeeklyChart";
import PieChart from "@/components/charts/DeliveryChart";

const OrdersChart = () => {
  const { data, isLoading, error } = useFetchOrders(1, 100);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Error loading data.</p>;
  }

  const salesData = SalesPerDay(data.data.orders);
  const deliveryStatusData = DeliveryStatus(data.data.orders);

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-32 max-w-screen'>
      <div>
        <h2 className='font-semibold'>فروش هفتگی</h2>
        <div className='mt-4'>
          <WeeklyChart salesData={salesData} />
        </div>
      </div>

      <div className='md:w-[350px]'>
        <h2 className='font-semibold'>وضعیت ارسال محصولات</h2>
        <div className='mt-4'>
          <PieChart data={deliveryStatusData} />
        </div>
      </div>
    </div>
  );
};

export default OrdersChart;
