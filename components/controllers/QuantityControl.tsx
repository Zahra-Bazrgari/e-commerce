"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "@/libs/redux/carSlice";
import { AppDispatch } from "@/libs/redux/store";

interface QuantityControlProps {
  itemId: string;
  quantity: number;
  maxQuantity: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ itemId, quantity, maxQuantity }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => dispatch(decrementQuantity({ _id: itemId }))}
        disabled={quantity <= 1}
        className="text-xl hover:text-gray-300"
      >
        -
      </button>
      <span className="font-semibold">{quantity}</span>
      <button
        onClick={() => dispatch(incrementQuantity({ _id: itemId }))}
        disabled={quantity >= maxQuantity}
        className="text-xl hover:text-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
