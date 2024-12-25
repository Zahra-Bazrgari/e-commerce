"use client";

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Option, Search, ShoppingBag, ShoppingCart, LogOut } from "lucide-react";
import { getRole } from "@/utils/role-manager";
import { signOut } from "@/apis/auth.service";

export const sidebarLinks = [
  {
    icon: <Home />,
    route: "/",
    label: "خانه",
  },
  {
    icon: <Search />,
    route: "/transaction-history",
    label: "جست و جو",
  },
  {
    icon: <ShoppingBag />,
    route: "/products",
    label: "محصولات",
  },
  {
    icon: <ShoppingCart />,
    route: "/cart",
    label: "سبد خرید",
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const role = getRole();

  const handleSignOut = () => {
    signOut(); 
    router.push("/log-in");
  };

  return (
    <section className="sidebar sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 pr-10 text-black md:hidden lg:block sm:p-4 xl:p-6 2xl:w-[355px]">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 cursor-pointer flex items-center gap-2 w-full justify-center"
        >
          <Image
            src="/logo/light-mode-logo.png"
            width={100}
            height={34}
            alt="Logo"
          />
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start text-16 font-semibold text-bs-black max-xl:hidden",
                { "bg-bs-primary-border-subtle !text-blue-800": isActive }
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>


      {role === "ADMIN" && (
        <button
          onClick={handleSignOut}
          className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start text-16 font-semibold text-red-600 hover:bg-red-100"
        >
          <LogOut />
          خروج از حساب کاربری
        </button>
      )}
    </section>
  );
};

export default Sidebar;
