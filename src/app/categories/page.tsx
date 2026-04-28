import Link from "next/link";
import MyCategories from "../_components/MyCategories/MyCategories";
import { BrandType, CategoryType } from "../api/types/products.type";

export default async function CategoryPage() {
  async function getCategory() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const data = await res.json();
    // console.log("hhhhll", data.data);
    return data.data;
  }
  const category = await getCategory();
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className=" border-s-6 border-green-600 p-3 my-4">
        Featured
        <span className="font-semibold text-green-600 ">Categories</span>
      </div>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {category.map((cat: CategoryType) => (
            <Link href={`categories/${cat._id}`} key={cat._id}>
              <MyCategories category={cat} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
