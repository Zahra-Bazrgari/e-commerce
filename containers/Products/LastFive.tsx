import { useFetchProducts } from '@/hooks/useQuery/useFetchProducts';
import React from "react";


const LastFiveProducts = () => {
  const { data, isLoading, error } = useFetchProducts({ page: 1 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const lastFiveProducts = data?.data?.products
  ?.filter((product) => product.createdAt) 
  ?.sort(
    (a, b) =>
      new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
  )
  ?.slice(0, 5);

  return (
    <div>
      <h2>Last Five Added Products</h2>
      <ul>
      {lastFiveProducts?.map((product) => (
  <li key={product._id}>
    <h3>{product.name}</h3>
    <p>Brand: {product.brand}</p>
    <p>Price: {product.price}</p>
    <p>
      Created At:{" "}
      {product.createdAt
        ? new Date(product.createdAt).toLocaleDateString()
        : "N/A"}
    </p>
  </li>
))}

      </ul>
    </div>
  );
};

export default LastFiveProducts;
