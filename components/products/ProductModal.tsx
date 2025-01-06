import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { addProductValidationSchema } from "@/libs/zod/product-schema";
import { IAddProducts } from "@/types/fetchProducts.types";
import { postProduct } from "@/apis/products.service";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddProducts>({
    resolver: zodResolver(addProductValidationSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IAddProducts) => {
    setLoading(true);
    const result = await postProduct(data);
    setLoading(false);

    if (result.success) {
      alert("Product added successfully!");
      reset();
      onClose();
      refetch();
    } else {
      alert(result.message || "Failed to add product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">افزودن محصول</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            <div className="mb-4">
              <label>نام محصول</label>
              <Input {...register("name")} error={errors.name?.message as string} />
            </div>
            <div className="mb-4">
              <label>برند</label>
              <Input {...register("brand")} error={errors.brand?.message as string} />
            </div>
          </div>

          <div className="mb-4">
            <label>دسته بندی</label>
            <Input {...register("category")} error={errors.category?.message as string} />
          </div>

          <div className="mb-4">
            <label>زیر دسته</label>
            <Input {...register("subcategory")} error={errors.subcategory?.message as string} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            <div className="mb-4">
              <label>قیمت</label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                error={errors.price?.message as string}
              />
            </div>

            <div className="mb-4">
              <label>تعداد</label>
              <Input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                error={errors.quantity?.message as string}
              />
            </div>
          </div>

          <div className="mb-4">
            <label>توضیحات</label>
            <Input {...register("description")} error={errors.description?.message as string} />
          </div>

          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="bg-gray-400 text-white py-2 px-4 rounded-md"
            >
              لغو
            </button>
            <button
              type="submit"
              className="bg-[#c8c5f6] py-2 px-4 rounded-md text-bs-black"
              disabled={loading}
            >
              {loading ? "در حال افزودن..." : "افزودن محصول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
