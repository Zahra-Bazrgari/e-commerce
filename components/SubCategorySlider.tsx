"use client"
import React from "react";
import Slider from "react-slick";
import ProductsCard from "@/components/products/ProductsCard";

interface ISubcategorySliderProps {
  subcategoryName: string;
  products: any[];
}

const SubcategorySlider: React.FC<ISubcategorySliderProps> = ({
  subcategoryName,
  products,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{subcategoryName}</h2>
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ProductsCard {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SubcategorySlider;
