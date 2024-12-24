"use client";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '@/libs/redux/carSlice';
import { AppDispatch, RootState } from '@/libs/redux/store';
import React from "react";
import { useSelector, useDispatch } from "react-redux";


const CartPage: React.FC = () => {
  const { cartItems, totalQuantity, totalItems } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">سبد خرید</h1>

      {cartItems.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm">برند: {item.brand}</p>
                <p className="text-sm">قیمت: {item.price} تومان</p>
                <p className="text-sm">تعداد: {item.quantity}</p>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item))}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        incrementQuantity({
                          ...item,
                          maxQuantity: item.maxQuantity,
                        })
                      )
                    }
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart({ _id: item._id }))}
                    className="text-red-600 font-bold"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold">جمع کل: {totalQuantity} عدد</h2>
        <h3 className="text-xl">مجموع آیتم‌ها: {totalItems}</h3>
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-6 px-8 py-3 bg-black text-white rounded-md"
        >
          نهایی کردن خرید
        </button>
      )}
    </div>
  );
};

export default CartPage;
