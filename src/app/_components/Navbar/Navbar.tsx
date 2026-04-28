"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GiShoppingCart } from "react-icons/gi";
import { FaHeadset } from "react-icons/fa6";
import { IoCartSharp, IoMenu } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import FirstNav from "../FirstNav/FirstNav";

import { handleSignOut, useAuthStatus } from "../ContextProvider/ContextProvider";
import { ContextCart } from "../ContextProvider/ContextUsrCart";

const categories = [
  { title: "All categories", href: "/categories" },
  { title: "Electronics", href: "/electronics" },
  { title: "Women's fashion", href: "/womens-fashion" },
  { title: "Men's fashion", href: "/mens-fashion" },
  { title: "Beauty & Health", href: "/beauty-health" },
];

export default function Navbar() {
  const { status } = useAuthStatus();
  const { cartcount, setcartcount } = React.useContext(ContextCart);
  return (
    <>
      <FirstNav />
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto h-14 sm:h-16 lg:h-[72px] px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <GiShoppingCart className="text-2xl sm:text-3xl lg:text-4xl scale-x-[-1] text-green-600" />
            <h1 className="text-base sm:text-lg lg:text-2xl font-bold tracking-tight">
              Fresh Cart
            </h1>
          </Link>

          <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-2xl mx-2 lg:mx-6">
            <div className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-2xl py-2 px-4 text-sm text-gray-500 cursor-pointer">
              Search products...
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="flex items-center gap-1">
                <NavigationMenuItem>
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/products"
                    className={navigationMenuTriggerStyle()}
                  >
                    Shop
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-56 p-3 grid gap-1">
                      {categories.map((cat) => (
                        <ListItem
                          key={cat.title}
                          title={cat.title}
                          href={cat.href}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/brands" className={navigationMenuTriggerStyle()}>
                    Brands
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className={navigationMenuTriggerStyle()}
                  >
                    <FaHeadset className="text-2xl bg-green-100 p-1.5 rounded-lg mr-1" />
                    <div className="text-xs leading-tight">
                      <p className="font-semibold">Support</p>
                      <p className="text-muted-foreground">24/7</p>
                    </div>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-0.5 sm:gap-1 border-s-2 border-slate-200 ps-2 sm:ps-3">
              <Link
                href="/wishlist"
                className="text-xl sm:text-2xl p-1.5 sm:p-2 hover:bg-green-50 rounded-full transition"
              >
                <IoIosHeartEmpty />
              </Link>
              <div className="indicator">
                <span className={`indicator-item badge badge-secondary  h-[20px] w-[20px] rounded-full ${cartcount==0 && "hidden"}`}>
                  {cartcount || ""}
                </span>
                <Link
                  href="/cart"
                  className="text-xl sm:text-2xl p-1.5 sm:p-2 hover:bg-green-50 rounded-full transition"
                >
                  <IoCartSharp />
                </Link>
              </div>
            </div>

            {status === "authenticated" ? (
              <button
                onClick={handleSignOut}
                className="hidden lg:flex bg-green-600 hover:bg-green-700  text-white px-5 py-2 rounded-2xl font-medium text-sm transition"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex bg-green-600 hover:bg-green-700  text-white px-5 py-2 rounded-2xl font-medium text-sm transition"
              >
                Sign in
              </Link>
            )}

            <Sheet>
              <SheetTrigger className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition">
                <IoMenu className="text-2xl" />
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2 justify-center py-2">
                      <GiShoppingCart className="text-4xl scale-x-[-1] text-green-600" />
                      <span className="text-2xl font-bold">Fresh Cart</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mx-4 mb-4">
                  <div className="w-full bg-gray-100 rounded-xl py-2.5 px-4 text-sm text-gray-500">
                    Search products...
                  </div>
                </div>

                <div className="flex flex-col px-4 gap-1">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Shop" },
                    { href: "/categories", label: "Categories" },
                    { href: "/brands", label: "Brands" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-3 px-3 rounded-xl hover:bg-gray-100 
                                 font-medium text-base transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <hr className="my-4 mx-4" />

                <div className="flex gap-2 px-4">
                  <Link
                    href="/login"
                    className="flex-1 text-center bg-green-600 hover:bg-green-700 
                               text-white py-2.5 rounded-xl font-medium text-sm transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center border border-green-600 
                               hover:bg-green-600 hover:text-white
                               text-green-600 py-2.5 rounded-xl 
                               font-medium text-sm transition"
                  >
                    Register
                  </Link>
                </div>

                <Link
                  href="/contact"
                  className="flex items-center gap-3 mx-4 mt-4 p-3 
                             rounded-xl hover:bg-gray-100 transition"
                >
                  <FaHeadset className="text-3xl bg-green-100 p-2 rounded-lg text-green-600" />
                  <div>
                    <p className="font-semibold text-sm">Need Help?</p>
                    <p className="text-xs text-gray-500">
                      Contact Support 24/7
                    </p>
                  </div>
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}

function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2.5 rounded-xl hover:bg-gray-100 text-sm transition"
      >
        {title}
      </Link>
    </li>
  );
}
