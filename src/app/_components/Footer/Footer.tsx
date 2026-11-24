import React from "react";

export default function Footer() {
  return (
    <div className="bg-green-600 border-t border-green-700 text-center p-3 md:p-4 lg:p-6 font-bold text-white text-sm md:text-base ">
      <p>&copy; 2024 Fresh Cart. All rights reserved.</p>
      <p className="mt-1 text-xs md:text-sm font-normal">
        Developed by{" "}
        <a
          href="https://ahmed-salamah.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Ahmed Salamah
        </a>
      </p>
    </div>
  );
}
