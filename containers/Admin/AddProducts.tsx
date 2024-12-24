"use client";
import React, { useState } from "react";
import { IAddProducts } from "@/types/fetchProducts.types";
import { postProduct } from "@/apis/products.service";

const AddProduct = () => {
  const [productData, setProductData] = useState<IAddProducts>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 1,
    brand: "",
    description: "",
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
      setProductData({
        category: "",
        subcategory: "",
        name: "",
        price: 0,
        quantity: 1,
        brand: "",
        description: "",
      });
    } else {
      alert(result.message || "Failed to add product");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Description</label>
          <input
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          ></input>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
