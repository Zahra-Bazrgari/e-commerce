import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-bs-body-bg flex'>
      {/* <Sidebar /> */}
      {children}
    </div>
  )
}

export default layout