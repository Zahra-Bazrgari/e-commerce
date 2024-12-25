"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/libs/redux/carSlice";
import { AppDispatch } from "@/libs/redux/store";
import { X } from "lucide-react";
import Link from "next/link";
import QuantityControl from '../controllers/QuantityControl';


interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  brand: string;
  maxQuantity: number;
}

interface CartDropdownProps {
  cartItems: CartItem[];
  cartOpen: boolean;
  toggleCart: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cartItems, cartOpen, toggleCart }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="relative">
      {cartOpen && (
        <div className="absolute left-0 top-8 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500 w-full text-center">
              سبد خرید شما خالی است.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center justify-between border-b pb-3"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex">
                        <img
                          src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}` || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex flex-col items-center justify-center mr-4">
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart({ _id: item._id }))}
                        className="ml-6 hover:text-gray-400"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between w-full px-5 mt-3">
                      {/* Quantity Controls */}
                      <QuantityControl
                        itemId={item._id}
                        quantity={item.quantity}
                        maxQuantity={item.maxQuantity}
                      />

                      <p className="text-sm font-semibold">
                        {item.price * item.quantity} تومان
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href={"/cart"}>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                  مشاهده سبد خرید
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
