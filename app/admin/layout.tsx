
import AdminSideBar from '@/components/AdminSideBar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-bs-body-bg flex min-h-screen'>

      <AdminSideBar />
      {children}
    </div>
  )
}

export default layout