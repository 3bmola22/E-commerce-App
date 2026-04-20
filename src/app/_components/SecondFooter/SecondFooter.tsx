import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoShieldHalfOutline } from "react-icons/io5";
import { RxReload } from "react-icons/rx";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function SecondFooter() {
  return (
    <div className="bg-green-100">
      <div className="flex flex-wrap justify-between max-w-7xl m-auto px-4 py-6">
        <div className="flex items-center gap-4 w-1/2 md:w-1/4">
          <FaShippingFast className="text-green-800 bg-green-200 size-7 p-1 rounded-full" />
          <div>
            <p className="font-medium">Free Shipping</p>
            <span className="text-sm text-gray-600">
              On orders over 500 EGP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-1/2 md:w-1/4">
          <RxReload className="text-green-800 bg-green-200 size-7 p-1 rounded-full scale-x-[-1]" />
          <div>
            <p className="font-medium">Easy Returns</p>
            <span className="text-sm text-gray-600">14-day return policy</span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-1/2 md:w-1/4">
          <IoShieldHalfOutline className="text-green-800 bg-green-200 size-7 p-1 rounded-full" />
          <div>
            <p className="font-medium">Secure Payment</p>
            <span className="text-sm text-gray-600">100% secure checkout</span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-1/2 md:w-1/4">
          <TfiHeadphoneAlt className="text-green-800 bg-green-200 size-7 p-1 rounded-full scale-x-[-1]" />
          <div>
            <p className="font-medium">24/7 Support</p>
            <span className="text-sm text-gray-600">Contact us anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
