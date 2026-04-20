import FeaturedProducts from "./_components/FuteredProducts/FeaturedProducts";
import Slider from "./_components/Slider/Slider";
import img1 from "../assets/imgs/imgi_111_home-slider-1.d79601a8.png";
import img2 from "../assets/imgs/imgi_292_1678304313126-1.jpg";
import img3 from "../assets/imgs/imgi_319_1678301723376-3.jpg";
// import MyCategories from "./_components/MyCategories/MyCategories";
// import AllMyCategories from "./_components/AllMyCategories/AllMyCategories";
import { lazy, Suspense } from "react";
import { LoadingLazy } from "./_components/LoadingLazy/LoadingLazy";
import { Bounce, ToastContainer } from "react-toastify";
const LazyComponentCategory = lazy(
  () => import("./_components/AllMyCategories/AllMyCategories"),
);

export default function Home() {
  return (
    <>
      <Slider listItems={[img1.src, img2.src, img3.src]} />
      <Suspense fallback={<LoadingLazy />}>
        <LazyComponentCategory />
      </Suspense>
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
      <FeaturedProducts />
    </>
  );
}
