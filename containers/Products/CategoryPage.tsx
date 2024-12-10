"use client"
import ProductsCard from '@/components/ProductsCard';
import { useFetchProducts } from '@/hooks/useQuery/useFetchProducts';
import React from "react";


const ProductsPageContainer = ({ categoryId }: {categoryId: string}) => {
  const { data, isLoading, error } = useFetchProducts({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;

  const filteredProducts = data?.data.products.filter(
    (product) => product.category === categoryId
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductsCard key={product._id} {...product} />
        ))
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductsPageContainer;
