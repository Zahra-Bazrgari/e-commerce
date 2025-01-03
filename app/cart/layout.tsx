import CartSideBar from "@/components/cart/SideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bgs max-w-[1990px] mx-auto overflow-x-hidden flex w-full max-h-screen'>
      <section className='mx-auto'>
        <CartSideBar />
      </section>

      <section className='overflow-y-scroll overflow-x-hidden w-full'>
        {children}
      </section>
    </div>
  );
};

export default layout;
