"use client"
import DeliveryTable from '@/containers/Admin/DeliveryTableContainer'
import SalesChartsContainer from '@/containers/Admin/SalesChartsContainer'
import QueryClientWrapper from '@/providers/QueryClient'
import { getRole } from '@/utils/role-manager'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const role = getRole()

  if(role !== "ADMIN")
    {redirect("/404")

    }
    

  return (
    <div className='container mx-auto py-4'>
      <SalesChartsContainer />
      <DeliveryTable />
    </div>
  )
}


export default page