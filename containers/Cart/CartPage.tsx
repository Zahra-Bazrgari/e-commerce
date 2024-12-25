"use client";
import CartDetails from "@/components/cart/CartDetails";
import CartItem from '@/components/cart/CartItems';
import {
  clearCart,
} from "@/libs/redux/carSlice";
import { AppDispatch, RootState } from "@/libs/redux/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CartPage: React.FC = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='flex flex-col lg:flex-row w-full p-8'>
      <div className='w-full lg:w-2/3 space-y-6'>
        <div className='flex flex-row justify-between items-center mb-6 border-b-2 pb-3 px-5'>
          <span className=' text-3xl font-bold '>سبد خرید</span>
          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className='mt-6 text-gray-700 hover:text-red-500'
            >
              حذف همه
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div className='space-y-4'>
            {cartItems.map((item) => (
              <CartItem
              key={item._id}
              item={{
                ...item,
                thumbnail: item.thumbnail || "/placeholder.jpg",
              }}
            />
            
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <CartDetails
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
          onClear={() => dispatch(clearCart())}
        />
      )}
    </div>
  );
};

export default CartPage;
