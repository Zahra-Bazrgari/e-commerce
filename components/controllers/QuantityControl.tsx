"use client";
import React from "react";

interface QuantityControlProps {
  itemId: string;
  quantity: number;
  maxQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  maxQuantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="text-xl hover:text-gray-300"
      >
        -
      </button>
      <span className="font-semibold">{quantity}</span>
      <button
        onClick={onIncrement}
        disabled={quantity >= maxQuantity}
        className="text-xl hover:text-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
