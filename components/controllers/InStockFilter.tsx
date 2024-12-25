import React from "react";

interface FilterButtonProps {
  showInStock: boolean;
  setQuantityFilter: (value: { key: string | null; value?: number }) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ showInStock, setQuantityFilter }) => {
  const handleClick = () => {
    if (showInStock) {
      setQuantityFilter({ key: null });
    } else {
      setQuantityFilter({ key: "gte", value: 1 });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-1 rounded-md ${
        showInStock ? "bg-slate-300 text-black" : "bg-bs-primary text-white"
      } hover:opacity-90`}
    >
      {showInStock ? <span>نمایش همه محصولات</span>: <span>نمایش محصولات موجود</span>} 
    </button>
  );
};

export default FilterButton;
