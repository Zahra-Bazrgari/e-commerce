"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { useToggleState } from "@/hooks/useToggleState";
import { CreditCard } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useToggleState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "داشبورد", path: "admin", icon: <LayoutDashboard width={22} /> },
    {
      name: "محصولات",
      path: "admin/products",
      icon: <ShoppingBag width={22} />,
    },
    { name: "سفارشات", path: "admin/orders", icon: <CreditCard width={22} /> },
  ];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen()}
        className='p-4 md:hidden absolute z-50'
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`fixed right-0 z-10 h-screen w-44 bg-bs-body-bg text-gray-600 transition-transform duration-300 shadow-lg border-l-[1px] pt-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:h-screen`}
      >
        <div className='w-full flex items-center justify-center'>
          <Image
            src={"/logo/light-mode-logo.png"}
            alt='Logo'
            width={100}
            height={100}
          />
        </div>

        <div className='mt-8 space-y-3'>
          {navItems.map((item) => (
            <div key={item.name}>
              <Link
                href={`/${item.path}`}
                className={`block px-4 py-2 text-lg font-medium ${
                  pathname === `/${item.path}`
                    ? "bg-blue-100 text-bs-blue"
                    : " text-bs-black"
                }`}
                onClick={() => setIsOpen()}
              >
                <div className='flex gap-2'>
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
