"use client";
import CartDetails from "@/components/cart/CartDetails";
import CartItem from "@/components/cart/CartItems";
import { useCart, useClearCart } from "@/hooks/useCart";
import React from "react";

const CartPage: React.FC = () => {
  const { data: cartData, isLoading } = useCart();
  const clearCartMutation = useClearCart();

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { items, totalPrice, totalQuantity } = cartData || { items: [], totalPrice: 0, totalQuantity: 0 };

  return (
    <div className="flex flex-col lg:flex-row w-full p-8">
      <div className="w-full lg:w-2/3 space-y-6">
        <div className="flex flex-row justify-between items-center mb-6 border-b-2 pb-3 px-5">
          <span className="text-3xl font-bold">سبد خرید</span>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-6 text-gray-700 hover:text-red-500"
            >
              حذف همه
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
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

      {items.length > 0 && (
        <CartDetails
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
          onClear={handleClearCart}
        />
      )}
    </div>
  );
};

export default CartPage;
