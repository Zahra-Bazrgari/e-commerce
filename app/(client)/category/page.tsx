import ProductsPageContainer from "@/containers/Products/CategoryPage";
import SubcategoryContainer from "@/containers/Products/SubgategorySlider";
import QueryClientWrapper from "@/providers/QueryClient";
import React from "react";

const page = () => {
  return (
      <div>
        <ProductsPageContainer categoryId='674c759e675ce510974d3244' />
        {/* <SubcategoryContainer subcategoryId="674f49f5500a93328b020a22" /> */}
      </div>
  );
};

export default page;
