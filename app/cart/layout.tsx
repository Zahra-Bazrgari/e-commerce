import CartSideBar from '@/components/cart/SideBar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bgs max-w-[1990px] mx-auto overflow-x-hidden flex w-full min-h-screen'>
      <CartSideBar />
      {children}
    </div>
  );
};

export default layout;
