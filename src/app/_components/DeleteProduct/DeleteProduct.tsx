import { deleteProduct } from '@/serverAction/deleteProductCartServer';
import { Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { Bounce, toast } from 'react-toastify';
import { ContextCart } from '../ContextProvider/ContextUsrCart';

export default function DeleteProduct({ id, count, setallProducts, setallCart ,children }) {
  const { cartcount, setcartcount } = useContext(ContextCart);

  async function handleDeleteProduct(id: string, count: number) {
    const data = await deleteProduct(id);
    setallProducts(data?.data.products || null);
    setallCart(data);
    console.log("trrr", data);
    if (data?.status === "success") {
      toast.success("Product cleared successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      setcartcount(cartcount - count);
    }
  }
  return (
    <button
      onClick={() => handleDeleteProduct(id, count)}
      className="cursor-pointer disabled:cursor-progress flex items-center justify-center w-10 h-10 p-0 bg-[#FEF2F2] border border-[#FFC9C9] rounded-xl hover:bg-red-50 transition-colors"
    >{children}
    </button>
  );
}
