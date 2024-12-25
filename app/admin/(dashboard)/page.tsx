import DeliveryTable from "@/containers/Admin/DeliveryTableContainer";
import SalesChartsContainer from "@/containers/Admin/SalesChartsContainer";
import React from "react";

const page = () => {
  return (
    <div className='container mx-auto py-4'>
      <SalesChartsContainer />
      <DeliveryTable />
    </div>
  );
};

export default page;
