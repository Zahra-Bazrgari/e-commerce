"use client"
import { useFetchProducts } from '@/hooks/useQuery/useFetchProducts';
import React from "react";


const ProductList = () => {
  const { data, isLoading, isError } = useFetchProducts({
    page: 1,
    limit: 4,
    fields: "-rating,-createdAt,-updatedAt,-__v",
    sort: "price",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data?.data.products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Brand: {product.brand}</p>
            <img src={product.thumbnail} alt={product.name} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
