"use client";
import React, { useState } from "react";
import { useFetchProducts } from "@/hooks/useQuery/useFetchProducts";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import { IProduct } from "@/types/fetchProducts.types";
import ProductModal from "@/components/ProductModal";
import { useToggleState } from "@/hooks/useToggleState";
import deleteProduct, { updateProduct } from "@/apis/products.service";

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [quantityFilter, setQuantityFilter] = useState<{
    key: string;
    value: number;
  } | null>(null);
  const [editingRows, setEditingRows] = useState<{
    [key: string]: Partial<IProduct>;
  }>({});
  const [originalRows, setOriginalRows] = useState<Record<string, IProduct>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useToggleState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const limit = 10;
  const quantity =
    quantityFilter !== null
      ? { [quantityFilter.key]: quantityFilter.value }
      : undefined;

  const { data, isLoading, isError, refetch } = useFetchProducts({
    page,
    limit,
    sort,
    quantity,
  });

  if (isLoading)
    return <div className='text-center py-8'>در حال بارگذاری...</div>;

  if (isError)
    return (
      <div className='text-center text-red-500 py-8'>
        خطا در دریافت محصولات.
      </div>
    );

  const products = data?.data.products || [];
  const totalPages = data?.total_pages || 1;

  const enterEditMode = (product: IProduct) => {
    setEditingRows((prev) => ({
      ...prev,
      [product._id]: { ...product },
    }));

    setOriginalRows((prev) => ({
      ...prev,
      [product._id]: { ...product },
    }));

    setIsEditMode(true);
  };

  const handleEdit = (id: string, field: keyof IProduct, value: any) => {
    setEditingRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const getUpdatedFields = (
    original: Partial<IProduct>,
    updated: Partial<IProduct>
  ): Partial<IProduct> => {
    const changedFields: Partial<IProduct> = {};

    for (const key of Object.keys(updated) as Array<keyof IProduct>) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (
        updatedValue !== originalValue &&
        updatedValue !== undefined &&
        updatedValue !== null
      ) {
        changedFields[key] = updatedValue;
      }
    }

    return changedFields;
  };

  const handleSaveAll = async () => {
    const updatePromises = Object.entries(editingRows)
      .map(([id, updatedRow]) => {
        const originalRow = originalRows[id];
        if (!originalRow) return null;

        const changes = getUpdatedFields(originalRow, updatedRow);
        if (Object.keys(changes).length === 0) return null;

        return updateProduct(id, changes);
      })
      .filter(Boolean);

    if (updatePromises.length === 0) {
      alert("هیچ تغییری یافت نشد!");
      return;
    }

    try {
      const results = await Promise.all(updatePromises);

      const failedUpdates = results.filter((res) => !res.success);
      if (failedUpdates.length) {
        alert(`برخی از تغییرات ذخیره نشدند.`);
        console.error("Failed updates:", failedUpdates);
      } else {
        alert("تمام تغییرات با موفقیت ذخیره شدند!");
        setEditingRows({});
        setOriginalRows({});
        setIsEditMode(false);
        refetch();
      }
    } catch (error) {
      console.error("Error updating products:", error);
      alert("خطا در ذخیره تغییرات.");
    }
  };

  const handleCancelAll = () => {
    setEditingRows({});
    setOriginalRows({});
    setIsEditMode(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (error: any) {
      console.error("Error deleting the product:", error.message);
    }
  };

  const columns = [
    {
      label: "نام محصول",
      render: (product: IProduct) =>
        editingRows[product._id] ? (
          <input
            value={editingRows[product._id].name || ""}
            onChange={(e) => handleEdit(product._id, "name", e.target.value)}
            className='text-center'
          />
        ) : (
          <span
            onClick={() => enterEditMode(product)}
            className='cursor-pointer'
          >
            {product.name}
          </span>
        ),
    },
    {
      label: "قیمت",
      render: (product: IProduct) =>
        editingRows[product._id] ? (
          <input
            type='number'
            value={editingRows[product._id].price || ""}
            onChange={(e) =>
              handleEdit(product._id, "price", Number(e.target.value))
            }
            className='text-center'
          />
        ) : (
          <span
            onClick={() => enterEditMode(product)}
            className='cursor-pointer'
          >
            {product.price}
          </span>
        ),
    },
    {
      label: "موجودی",
      render: (product: IProduct) =>
        editingRows[product._id] ? (
          <input
            type='number'
            value={editingRows[product._id].quantity || ""}
            onChange={(e) =>
              handleEdit(product._id, "quantity", Number(e.target.value))
            }
            className='text-center'
          />
        ) : (
          <span
            onClick={() => enterEditMode(product)}
            className='cursor-pointer'
          >
            {product.quantity}
          </span>
        ),
    },
    {
      label: "وضعیت",
      render: (product: IProduct) => (
        <span
          className={`${
            product.quantity > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } rounded-md px-2`}
        >
          {product.quantity > 0 ? "موجود" : "ناموجود"}
        </span>
      ),
    },
    { label: "برند", render: (product: IProduct) => product.brand },
    {
      label: "عملیات",
      render: (product: IProduct) => (
        <button
          onClick={() => handleDelete(product._id)}
          className='text-red-600 hover:text-red-800'
        >
          🗑️
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>محصولات</h1>

      <div className='w-full flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <Sort setSort={setSort} />
          <Filter setQuantityFilter={setQuantityFilter} />
        </div>

        {!isEditMode && (
          <button
            onClick={() => setIsModalOpen()}
            className='bg-gradient-to-r from-[#171534] to-[#5b598a] text-white py-2 px-4 rounded-md'
          >
            افزودن محصول جدید
          </button>
        )}

        {isEditMode && (
          <div className="">
            <button
              onClick={handleSaveAll}
              className='bg-blue-500 text-white py-2 px-4 rounded-md ml-4'
            >
              ذخیره همه
            </button>
            <button
              onClick={handleCancelAll}
              className='bg-red-500 text-white py-2 px-4 rounded-md ml-4'
            >
              انصراف
            </button></div>
          
        )}
      </div>

      <Table
        data={products}
        columns={columns}
        noDataMessage='هیچ محصولی یافت نشد'
        rowKey={(product) => product._id}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen()} />
    </div>
  );
};

export default ProductsTable;
