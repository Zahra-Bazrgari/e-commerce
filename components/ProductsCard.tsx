import React from "react";
import { IProduct } from "@/types/fetchProducts.types";
import Image from "next/image";
import Link from "next/link";
import { CircleAlert, Heart, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { addToCart } from "@/libs/redux/carSlice";

const ProductsCard = ({
  _id,
  name,
  category,
  subcategory,
  price,
  quantity,
  brand,
  images,
  description,
  rating,
}: IProduct) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const isInCart = cartItems.some((item) => item._id === _id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isInCart && quantity > 0) {
      dispatch(
        addToCart({
          _id,
          name,
          price,
          brand,
          images,
          description,
          maxQuantity: quantity,
          quantity: 1,
          category,
          subcategory,
        })
      );
    }
  };

  return (
    <Link href={`/products/${_id}`}>
      <div className='bg-bs-white hover:shadow-2xl rounded-md text-bs-gray-dark p-4 grid grid-cols-1 gap-2 md:h-[450px]'>
        <div className='rounded-md'>
          <Image
            src={`http://localhost:8000/images/products/images/${images[0]}`}
            alt={name}
            width={300}
            height={300}
            className='rounded-md w-full'
          />
        </div>

        <div className='flex gap-1 items-center mt-2'>
          <div className='bg-bs-primary-bg-subtle px-1 text-sm text-bs-gray-dark font-bold rounded-2xl'>
            {brand}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='font-bold'>{name}</div>
          {rating && (
            <div className='flex items-center text-yellow-500 text-sm'>
              <span className='ml-1'>{rating.rate}</span>
              <span>⭐</span>
            </div>
          )}
        </div>

        <p className='text-xs text-gray-600 truncate'>{description}</p>

        {quantity < 5 && quantity > 0 && (
          <div className='flex items-center justify-between'>
            <p className='text-bs-red text-xs flex gap-1'>
              <CircleAlert size={15} />
              تنها {quantity} عدد در انبار باقی مانده
            </p>
            <div className='text-left font-medium'>{price} تومان</div>
          </div>
        )}

        {!(quantity < 5) && (
          <div className='text-left font-medium w-full'>{price} تومان</div>
        )}

        <div className='w-full flex items-center border-2 border-black h-fit rounded-[33px]'>
          <button
            className={`py-1 rounded-3xl w-full flex items-center justify-center gap-3 text-white ${
              isInCart || quantity <= 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black"
            }`}
            onClick={handleAddToCart}
            disabled={isInCart || quantity <= 0}
          >
            <ShoppingBag size={18} />
            {quantity <= 0 ? (
              <span>ناموجود</span>
            ) : isInCart ? (
              <span>در سبد خرید</span>
            ) : (
              <span>افزودن به سبد خرید</span>
            )}
          </button>
          <div className='flex items-center justify-center text-center w-[30%]'>
            <Heart />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
