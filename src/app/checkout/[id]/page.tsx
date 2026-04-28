"use client";
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaShieldHalved, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp } from "react-icons/io5";
import { type } from "./../../../../.next/types/routes.d";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  checkoutSchema,
  CheckoutType,
  LoginData,
  loginSchema,
} from "@/schema/registerSchema";
import { sendLoginData } from "@/serverAction/server.Action";
import { signIn } from "next-auth/react";
import { onlinePayment } from "@/serverAction/checkoutServer";

export default function Checkout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      phone: "",
      city: "",
      details: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const { handleSubmit, register, control } = form;
  async function submit(inputsData: CheckoutType) {
    const res = await onlinePayment(id, "", inputsData);
    window.location.href = res.session.url
    // console.log("ddda", res);
  }
  return (
    <div className="max-w-6xl flex flex-wrap justify-center m-auto">
      <div className="w-full lg:w-1/2 ">
        <div className="inner p-2">
          <h1>Chekcout Online</h1>
          <p>
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
          <div className="my-4">
            <div className="flex items-center gap-4 ">
              <FaStar className="text-green-800 bg-green-200 size-7 p-1 rounded-full" />
              <div>
                <p>Premium Quality</p>
                <span>
                  Premium quality products sourced from trusted suppliers.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <FaShippingFast className="text-green-800 bg-green-200 size-7 p-1 rounded-full" />
              <div>
                <p>Fast Delivery</p>
                <span>Same-day delivery available in most areas </span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <FaShieldHalved className="text-green-800 bg-green-200 size-7 p-1 rounded-full" />
              <div>
                <p>Secure Shopping</p>
                <span>Your data and payments are completely secure</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div>
              <p>Sarah Johnson</p>
              <span className="flex gap-1">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </span>
            </div>
          </div>
          <span>
            "FreshCart has transformed my shopping experience. The quality of
            the products is outstanding, and the delivery is always on time.
            Highly recommend!"
          </span>
        </div>
      </div>
      <div className="w-full lg:w-1/2 ">
        <div className="inner p-3 text-center">
          <h2 className="font-bold ">Login Now</h2>
          <p>Start your fresh journey with us today</p>
          <div className="flex justify-center">2btn</div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col items-center gap-y-4 p-4"
          >
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="detailsInput">details*</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id="detailsInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your details"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cityInput">city*</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id="cityInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your city"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phoneInput">phone*</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="phoneInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your phone"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              className="bg-green-600 w-[90%] font-bold cursor-pointer"
              type="submit"
            >
              <IoPersonAddSharp className="text-white" />
              Checkout
            </Button>
          </form>
          <p className="flex gap-3 justify-center">
            <span> New to FreshCart?</span>
            <Link className="text-green-700" href="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}
