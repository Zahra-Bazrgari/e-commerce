"use client";
import React, { useState } from "react";
import { ListFilter, X } from "lucide-react";
import { useToggleState } from "@/hooks/useToggleState";

type Props = {
  setSort: (value: string) => void;
};

const Sort = ({ setSort }: Props) => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useToggleState();
  const [selectedSort, setSelectedSort] = useState<string>("");

  return (
    <div className='text-bs-black flex flex-col gap-2 mb-3 items-center md:flex-row md:gap-0 md:mb-0'>
      <h2
        className='flex gap-1 items-center cursor-pointer text-lg text-black hover:text-bs-blue transition-colors'
        onClick={() => setIsSortMenuOpen()}
      >
        <ListFilter />
        مرتب سازی
        {isSortMenuOpen && <span>:</span>}
      </h2>
      {isSortMenuOpen && (
        <div
          className={`flex items-center gap-4 transform transition-transform duration-600 ${
            isSortMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className='flex items-center gap-4 mx-2'>
            <button
              className={`transition-colors ${
                selectedSort === "-price" ? "text-bs-blue" : "text-black"
              } hover:text-bs-blue`}
              onClick={() => {
                setSelectedSort("-price");
                setSort("-price");
              }}
            >
              گران‌ترین
            </button>

            <button
              className={`transition-colors ${
                selectedSort === "price" ? "text-bs-blue" : "text-black"
              } hover:text-bs-blue`}
              onClick={() => {
                setSelectedSort("price");
                setSort("price");
              }}
            >
              ارزان‌ترین
            </button>
            <button
              className={"transition-colors text-black hover:text-bs-blue"}
              onClick={() => {
                setSelectedSort("");
                setIsSortMenuOpen();
                setSort("");
              }}
            >
              لغو
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
