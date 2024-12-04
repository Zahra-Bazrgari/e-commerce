"use client"
import OrdersPage from "@/containers/OrdersTableContainer";
import { getRole } from "@/utils/role-manager";
import { redirect } from 'next/navigation';

import React from "react";

const page = () => {
  const role = getRole();

  if (role !== "ADMIN") {
    redirect("/404");
  }
  return (
    <div className='container mx-auto p-4'>
      <OrdersPage />
    </div>
  );
};

export default page;
