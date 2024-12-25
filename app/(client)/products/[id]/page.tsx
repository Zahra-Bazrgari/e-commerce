"use client";

import ProductDetails from "@/components/products/SingleProduct";
import { useFetchProductById } from "@/hooks/useQuery/useSingleProduct";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: React.FC<Props> = ({ params }) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => setId(resolvedParams.id));
  }, [params]);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useFetchProductById(id || "");

  if (!id || isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message || "Failed to load product."}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className='p-8 pt-10'>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
