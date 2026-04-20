"use server"
import { getRealToken } from "@/utilities";
import { useContext } from "react";

export async function deleteProduct(id) {
    const token = await getRealToken();


    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
        { method: "DELETE", headers: { token: token } },
      );
      const data = await res.json();
      return data

      // console.log("deleteh", data);
    } catch (error) {
      return undefined;
    }
  }