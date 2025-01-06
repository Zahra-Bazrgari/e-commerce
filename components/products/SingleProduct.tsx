import React, { useState, useEffect } from "react";
import { IProduct } from "@/types/fetchProducts.types";
import Image from "next/image";
import { CircleAlert, ShoppingBag } from "lucide-react";
import { useCart, useAddToCart, useUpdateQuantity } from "@/hooks/useCart";

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { data: cartData, isLoading: cartLoading } = useCart();
  const addToCartMutation = useAddToCart();
  const updateQuantityMutation = useUpdateQuantity();

  const cartItem = cartData?.items.find((item) => item._id === product._id);
  const [itemCount, setItemCount] = useState<number>(1);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (cartItem) {
      setItemCount(cartItem.quantity);
    }
  }, [cartItem]);

  const increment = () => {
    if (cartItem) {
      if (cartItem.quantity < product.quantity) {
        updateQuantityMutation.mutate({
          _id: cartItem._id,
          quantity: cartItem.quantity + 1,
        });
      }
    } else {
      setItemCount((prev) => (prev < product.quantity ? prev + 1 : prev));
    }
  };

  const decrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantityMutation.mutate({
        _id: cartItem._id,
        quantity: cartItem.quantity - 1,
      });
    } else {
      setItemCount((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddToCart = () => {
    if (!cartItem && product.quantity >= 1) {
      addToCartMutation.mutate({
        ...product,
        quantity: itemCount,
        maxQuantity: product.quantity,
      });
    }
  };

  const currentImagePath =
    product.images.length > 0
      ? `http://localhost:8000/images/products/images/${product.images[currentImageIndex]}`
      : "/assets/placeholder-img.png";

  return (
    <div className="flex flex-col gap-10 lg:flex-row-reverse items-center justify-around p-20 lg:h-screen">
      <div className="mb-5 order-1 text-center">
        <Image
          src={currentImagePath}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-md"
        />
        {product.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={`http://localhost:8000/images/products/images/${image}`}
                alt={`Thumbnail ${index + 1}`}
                width={70}
                height={70}
                className={`cursor-pointer rounded-md ${
                  currentImageIndex === index
                    ? "ring-2 ring-black"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 gap-10 order-2 lg:order-1 text-center lg:text-right">
        <h2 className="text-5xl font-bold mb-4">{product.name}</h2>
        <p className="text-xl text-gray-700 font-semibold mb-2">
          برند: {product.brand}
        </p>
        <p className="text-xl text-gray-700 font-semibold mb-2">
          قیمت: {product.price} تومان
        </p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {product.quantity < 5 && product.quantity > 0 && (
          <p className="text-bs-red text-xs flex gap-1">
            <CircleAlert size={15} />
            تنها {product.quantity} عدد در انبار باقی مانده
          </p>
        )}

        <div className="flex items-center gap-4 my-4">
          <button
            onClick={decrement}
            disabled={cartLoading || (!cartItem && itemCount <= 1)}
            className="bg-gray-200 px-4 py-2 rounded-md text-black font-bold hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-xl font-bold">{itemCount}</span>
          <button
            onClick={increment}
            disabled={
              cartLoading || (cartItem && cartItem.quantity >= product.quantity)
            }
            className="bg-gray-200 px-4 py-2 rounded-md text-black font-bold hover:bg-gray-400"
          >
            +
          </button>
        </div>

        <button
          className={`py-3 rounded-3xl w-full flex items-center justify-center gap-3 ${
            cartItem || product.quantity <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white"
          }`}
          onClick={handleAddToCart}
          disabled={
            !!cartItem || product.quantity <= 0 || addToCartMutation.isLoading
          }
        >
          <ShoppingBag size={18} className="hidden sm:block" />
          {product.quantity <= 0 ? (
            <span>ناموجود</span>
          ) : cartItem ? (
            <span>در سبد خرید</span>
          ) : (
            <div>
              <span className="hidden sm:block">افزودن به سبد خرید</span>
              <span className="block sm:hidden">سبد خرید</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
