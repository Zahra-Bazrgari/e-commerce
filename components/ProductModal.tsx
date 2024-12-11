import React, { useState } from "react";
import { IAddProducts } from "@/types/fetchProducts.types";
import { postProduct } from "@/apis/products.service";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState<IAddProducts>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 1,
    brand: "",
    description: "",
    // thumbnail: "",
    // images: [],
    // rating: { rate: 0, count: 0 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await postProduct(productData);
    if (result.success) {
      alert("Product added successfully!");
      onClose();
    } else {
      alert(result.message || "Failed to add product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-md'>
        <h2 className='text-2xl font-bold mb-4'>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={productData.name}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>Category</label>
            <input
              type='text'
              name='category'
              value={productData.category}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>sub category</label>
            <input
              type='text'
              name='subcategory'
              value={productData.subcategory}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>Price</label>
            <input
              type='number'
              name='price'
              value={productData.price}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>Quantity</label>
            <input
              type='number'
              name='quantity'
              value={productData.quantity}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>Brand</label>
            <input
              type='text'
              name='brand'
              value={productData.brand}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label>Description</label>
            <input
              type='text'
              name='description'
              value={productData.description}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4 flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white py-2 px-4 rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded-md'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
