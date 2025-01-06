"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-multi-date-picker/styles/layouts/mobile.css";
import CalendarComponent from "@/components/date-picker/DatePicker";
import { Input } from "@/components/Input";
import { shippingSchema } from "@/libs/zod/product-schema";
import CartDetails from "@/components/cart/CartDetails";
import { useCart, useRemoveFromCart, useUpdateQuantity } from "@/hooks/useCart";
import QuantityControl from "@/components/controllers/QuantityControl";
import { Trash } from "lucide-react";
import { getSession } from "@/utils/session-manager";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/user-manager";
import updateUser from "@/apis/users.service";

type ShippingFormData = {
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  date: string;
};

export default function ShippingPage() {
  const router = useRouter();
  const [isLoadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession) {
      router.push("/404");
      return;
    }
    setLoadingSession(false);
  }, [router]);

  const { data: cartData, isLoading: isCartLoading } = useCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateQuantityMutation = useUpdateQuantity();

  const userInfo = getUserInfo();

  const {
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      name: userInfo?.firstname || "",
      lastName: userInfo?.lastname || "",
      address: userInfo?.address || "",
      phoneNumber: userInfo?.phoneNumber || "",
    },
  });

  const onSave = async () => {
    const { address, phoneNumber, date } = getValues();

    try {
      if (userInfo?.userId) {
        if (address !== userInfo.address || phoneNumber !== userInfo.phoneNumber) {
          await updateUser(userInfo.userId, { address, phoneNumber });
        }
      }

      if (!date) {
        alert("لطفاً تاریخ ارسال را انتخاب کنید.");
        return;
      }

      localStorage.setItem("deliveryDate", date);
      router.push("/checkout");
    } catch (error) {
      console.error("Error during saving or updating:", error);
      alert("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
    }
  };

  if (isLoadingSession || isCartLoading) {
    return <p>Loading...</p>;
  }

  const { items = [], totalPrice = 0, totalQuantity = 0 } = cartData || {};

  const handleRemove = (itemId: string) => {
    removeFromCartMutation.mutate({ _id: itemId });
  };

  const handleIncrement = (
    itemId: string,
    quantity: number,
    maxQuantity: number
  ) => {
    if (quantity < maxQuantity) {
      updateQuantityMutation.mutate({ _id: itemId, quantity: quantity + 1 });
    }
  };

  const handleDecrement = (itemId: string, quantity: number) => {
    if (quantity > 1) {
      updateQuantityMutation.mutate({ _id: itemId, quantity: quantity - 1 });
    }
  };

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-col lg:flex-row w-full p-8">
        <div className="w-full lg:w-2/3">
          <div className="mb-6 border-b-2 pb-3 px-5">
            <span className="text-3xl font-bold">اطلاعات شما</span>
          </div>
          <form className="w-full flex flex-col gap-6">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block mb-2">نام:</label>
                <Input
                  {...register("name")}
                  placeholder="نام خود را وارد کنید"
                  error={errors.name?.message}
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2">نام خانوادگی:</label>
                <Input
                  {...register("lastName")}
                  placeholder="نام خانوادگی خود را وارد کنید"
                  error={errors.lastName?.message}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block mb-2">شماره تلفن:</label>
                <Input
                  {...register("phoneNumber")}
                  placeholder="شماره تلفن خود را وارد کنید"
                  error={errors.phoneNumber?.message}
                />
              </div>

              <div>
                <label className="block mb-2">تاریخ ارسال:</label>
                <CalendarComponent
                  onDateChange={(date) => setValue("date", date)}
                />
                {!!errors.date?.message && (
                  <p className="text-red-400 text-xs font-semibold capitalize mt-2">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">آدرس:</label>
              <Input
                {...register("address")}
                placeholder="آدرس خود را وارد کنید"
                error={errors.address?.message}
              />
            </div>
          </form>
        </div>

        {items.length > 0 && (
          <CartDetails
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            isValid={isValid}
            onSave={onSave}
          />
        )}
      </div>

      <div>
        <div className="my-8 border-b-2 pb-3 px-5">
          <span className="text-xl font-bold">سبد خرید</span>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide gap-5">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col items-center">
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                  alt={item.name}
                  className="w-40 h-40 object-cover mb-2 rounded-lg"
                />
                <span className="font-semibold">{item.name}</span>
                <div className="flex gap-2 items-center mt-2">
                  <QuantityControl
                    itemId={item._id}
                    quantity={item.quantity}
                    maxQuantity={item.maxQuantity}
                    onIncrement={() =>
                      handleIncrement(item._id, item.quantity, item.maxQuantity)
                    }
                    onDecrement={() => handleDecrement(item._id, item.quantity)}
                  />
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
