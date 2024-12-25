"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Home, LayoutDashboard, Menu, PlusSquare, X, LogOut } from "lucide-react";
import { CreditCard, ShoppingBag } from "lucide-react";
import { useToggleState } from "@/hooks/useToggleState";
import { getRole } from "@/utils/role-manager";
import { signOut } from "@/apis/auth.service";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useToggleState(false);
  const pathname = usePathname();
  const router = useRouter();
  const role = getRole(); 

  const navItems = [
    { name: "خانه", path: "", icon: <Home width={22} /> },
    { name: "داشبورد", path: "admin", icon: <LayoutDashboard width={22} /> },
    {
      name: "محصولات",
      path: "admin/products",
      icon: <ShoppingBag width={22} />,
    },
    { name: "سفارشات", path: "admin/orders", icon: <CreditCard width={22} /> },
    {
      name: "افزودن محصول",
      path: "admin/add-product",
      icon: <PlusSquare width={22} />,
    },
  ];

  const handleSignOut = () => {
    signOut();
    router.push("/"); 
  };

  return (
    <div className="relative">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsOpen()}
        className="p-4 md:hidden absolute z-50"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`fixed right-0 z-10 h-screen w-44 bg-bs-body-bg text-gray-600 transition-transform duration-300 shadow-lg border-l-[1px] pt-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:h-screen`}
      >
        {/* Logo */}
        <div className="w-full flex items-center justify-center">
          <Image
            src={"/logo/light-mode-logo.png"}
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Navigation links */}
        <div className="mt-8 space-y-3">
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
                <div className="flex gap-2">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {role === "ADMIN" && (
          <div className="absolute bottom-4 w-full">
            <button
              onClick={handleSignOut}
              className="w-full flex gap-2 text-center items-center justify-center px-4 py-2 font-medium text-bs-black hover:text-red-500"
            >
              <LogOut width={22} />
              خروج
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
