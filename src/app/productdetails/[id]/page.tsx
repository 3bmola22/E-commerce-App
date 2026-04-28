import { getProductDetails } from "@/app/api/service/service";
import { ProductType } from "@/app/api/types/products.type";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import Rate from "@/app/_components/Rate/Rate";
import WishBtn from "@/app/_components/WishBtn/WishBtn";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { Bounce, ToastContainer } from "react-toastify";
import { Heart, Share2 } from "lucide-react";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const productDetails = await getProductDetails({ id });
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="w-full lg:w-5/12 xl:w-2/5 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 ">
            <div className="   rounded-lg border border-gray-200 hover:border-[#6A7282] transition overflow-hidden">
              <img
                src={productDetails?.imageCover}
                alt={productDetails?.title}
                className="object-cove w-full h-full"
              />
            </div>

            {productDetails?.images.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 my-3 min-w-0">
                {productDetails?.images.map((img: String, index: number) => (
                  <div
                    key={index}
                    className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 shrink p-1"
                  >
                    <div className="relative w-full h-20 sm:h-24 md:h-28 rounded-lg border-2 border-[#6A7282] overflow-hidden">
                      <img
                        src={img}
                        alt={`${productDetails?.title} - ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-7/12 xl:w-3/5 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-wrap gap-3 mb-6">
              <p className="px-4 py-1.5 rounded-lg bg-green-100 text-green-800 text-sm font-medium">
                {productDetails?.category.name}
              </p>
              <p className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                {productDetails?.brand.name}
              </p>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {productDetails?.title}
            </h1>
            <Rate product={productDetails} />
            <p className="text-2xl font-semibold ">
              {productDetails?.price} EGP
            </p>

            {productDetails?.quantity > 0 && (
              <p className="px-4 py-1.5 rounded-lg bg-green-100 text-green-800 text-sm font-medium that w-fit flex items-center gap-2">
                <GoDotFill />
                In Stock ({productDetails?.quantity})
              </p>
            )}
            <hr />
            <div className=" text-gray-700 leading-relaxed">
              {productDetails?.description}
            </div>
            <div className=" text-gray-700 leading-relaxed">Quantity</div>
            <div className=" text-gray-700 leading-relaxed">Quantity</div>
            <div className=" flex gap-2 justify-around">
              <AddBtn
                productId={id}
                classes={
                  "w-full bg-green-700 text-white p-2 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                }
              >
                <FaCartShopping />
                Add to Cart
              </AddBtn>
              <AddBtn
                productId={id}
                classes={
                  "w-full bg-green-700 text-white p-2 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                }
              >
                <FaCartShopping />
                Add to Cart
              </AddBtn>
            </div>
            <div className=" left-[24px] right-[24px] top-[611px] flex flex-row items-start gap-[12px] h-[52px]">
              {/* Add to Wishlist Button - Large */}
              <WishBtn productId={id} classes={`cursor-pointer flex-1 flex flex-row justify-center items-center gap-[8px] 
          h-[52px] px-[16px] py-[12px] 
          border-2 border-[#E5E7EB] rounded-[12px] 
          text-[#364153] font-medium text-[16px] leading-[24px]
          hover:bg-gray-50 active:bg-gray-100 transition-colors`}>
                <Heart className="w-5 h-5 text-[#364153]" />
                Add to Wishlist
              </WishBtn>

              {/* Small Icon Button */}
              <button
                className={`flex flex-col items-center justify-center 
          w-[56px] h-[52px] 
          border-2 border-[#E5E7EB] rounded-[12px] 
          hover:bg-gray-50 active:bg-gray-100 transition-colors`}
              >
                <Share2 className="w-5 h-5 text-[#364153]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
