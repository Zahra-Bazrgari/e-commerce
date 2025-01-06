"use client";
import React from "react";
import { X } from "lucide-react";
import { useRemoveFromCart, useUpdateQuantity } from "@/hooks/useCart";
import QuantityControl from "../controllers/QuantityControl";

interface CartItemProps {
  item: {
    _id: string;
    name: string;
    brand: string;
    thumbnail: string;
    price: number;
    quantity: number;
    maxQuantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const removeFromCartMutation = useRemoveFromCart();
  const updateQuantityMutation = useUpdateQuantity();

  const handleRemove = () => {
    removeFromCartMutation.mutate({ _id: item._id });
  };

  const handleIncrement = () => {
    if (item.quantity < item.maxQuantity) {
      updateQuantityMutation.mutate({ _id: item._id, quantity: item.quantity + 1 });
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantityMutation.mutate({ _id: item._id, quantity: item.quantity - 1 });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4">
      <div className="flex w-full justify-between items-center">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md ml-4"
        />
        <div className="flex-grow ml-4">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600">{item.brand}</p>
        </div>
        <button
          onClick={handleRemove}
          className="ml-6 hover:text-gray-400 block md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="w-full flex items-center justify-between">
        <QuantityControl
          itemId={item._id}
          quantity={item.quantity}
          maxQuantity={item.maxQuantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />

        <p className="text-lg font-semibold ml-6 mt-3">
          {item.price * item.quantity} تومان
        </p>

        <button
          onClick={handleRemove}
          className="ml-6 hover:text-gray-400 hidden md:block"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
