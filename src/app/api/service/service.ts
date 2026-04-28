import { cache } from "react";
import { CategoryType, ProductType } from "../types/products.type";

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?limit=100",
      { cache: "force-cache" },
    );

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    // console.error("Error fetching products:", error);
    return [];
  }
}
export async function getProductDetails({
  id,
}: {
  id: string;
}): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "no-store",
      },
    );
    const data = await res.json();
    return data.data;
  } catch (err) {}
  return undefined;
}
export async function getAllCategories(): Promise<CategoryType[] | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      { cache: "no-cache" },
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
        // console.log("getAllCategories", data);

    return data.data;

  } catch (err) {
    // console.error(err);
    return undefined;
  }
}

export async function getAllSubCategories(): Promise<
  CategoryType[] | undefined
> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
      { cache: "no-cache" },
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    // console.log("getAllSubCategories", data);

    return data.data;
  } catch (err) {
    // console.error(err);
    return undefined;
  }
}
getAllSubCategories();
export async function getSubCategory(
  id: string,
): Promise<CategoryType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
    );

    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}
