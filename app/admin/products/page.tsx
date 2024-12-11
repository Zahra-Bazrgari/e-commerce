"use client"
import React from "react";
import ProductsTable from "@/containers/Admin/ProductsTable";
import { getRole } from "@/utils/role-manager";
import { redirect } from 'next/navigation';

const page = () => {
  const role = getRole();

  if (role !== "ADMIN") {
    redirect("/404");
  }
  return (
    <div className="container mx-auto p-4">
      <ProductsTable />
    </div>
  );
};

export default page;
