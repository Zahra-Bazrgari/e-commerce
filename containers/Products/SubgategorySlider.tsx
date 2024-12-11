"use client"
import { useFetchSubcategory } from '@/hooks/useMutation/Category';
import React from "react";
import ProductsPageContainer from './CategoryPage';


const SubcategoryContainer = ({ subcategoryId }: { subcategoryId: string }) => {
  const { data, isLoading, error } = useFetchSubcategory(subcategoryId);

  if (isLoading) return <p>Loading subcategory...</p>;
  if (error || !data) return <p>Error loading subcategory!</p>;

  const categoryId = data.category._id;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
      <ProductsPageContainer categoryId={categoryId} />
    </div>
  );
};

export default SubcategoryContainer;
