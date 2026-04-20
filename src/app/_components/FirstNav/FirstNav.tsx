import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaGifts } from "react-icons/fa6";
import { IoCall, IoPersonAddSharp, IoPersonOutline } from "react-icons/io5";
import { MdLocalShipping, MdOutlineMail } from "react-icons/md";
import { singnOutt, useAuthStatus } from "../ContextProvider/ContextProvider";

export default function FirstNav() {
   const {status}=useAuthStatus();
  
  return (
    <div className="hidden md:block bg-gray-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-xs lg:text-sm">
        <div className="flex items-center gap-3 lg:gap-6">
          <div className="flex gap-1 items-center text-gray-600">
            <MdLocalShipping className="text-green-600 text-base flex-shrink-0" />
            <span className="hidden lg:inline">
              Free Shipping on Orders 500 EGP
            </span>
            <span className="lg:hidden">Free Shipping +500 EGP</span>
          </div>

          <div className="flex gap-1 items-center text-gray-600">
            <FaGifts className="text-green-600 text-base flex-shrink-0" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden lg:flex gap-1 items-center text-gray-600">
            <IoCall className="flex-shrink-0" />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="hidden lg:flex gap-1 items-center text-gray-600">
            <MdOutlineMail className="flex-shrink-0" />
            <span>support@freshcart.com</span>
          </div>

          {status === "authenticated" ? (
            ""
          ) : (
            <div className="flex items-center gap-2 ps-3 border-s-2 border-slate-200">
              <Link
                href="/login"
                className="flex gap-1 items-center text-gray-600 
                         hover:text-green-600 transition-colors"
              >
                <IoPersonOutline className="flex-shrink-0" />
                <span>Login</span>
              </Link>

              <span className="text-slate-300">|</span>

              <Link
                href="/register"
                className="flex gap-1 items-center text-gray-600 
                         hover:text-green-600 transition-colors"
              >
                <IoPersonAddSharp className="flex-shrink-0" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
