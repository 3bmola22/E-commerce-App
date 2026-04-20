"use client";
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaShieldHalved, FaStar } from "react-icons/fa6";
import img from "../../../assets/imgs/person.png";
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
import * as zod from "zod";
import { error } from "console";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "@/schema/registerSchema";
import { sendRegisterData } from "@/serverAction/server.Action";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const routing = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit, register, control } = form;
  async function submit(inputsData: RegisterData) {
    const registerStatus = await sendRegisterData(inputsData);
    if (registerStatus) {
      toast.success("👍 We do it!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => routing.push("/login"), 3000);
    } else {
      toast.warning("✋ Error Type!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    // console.log("ayyy", inputsData);
  }
  return (
    <div className="max-w-6xl flex flex-wrap justify-center m-auto">
      <div className="w-full lg:w-1/2 ">
        <div className="inner p-2">
          <h1>Welcome to FreshCart</h1>
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
            <img
              src={img.src}
              alt="person"
              className=" bg-green-200 size-9  rounded-full"
            />
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
          <h2 className="font-bold ">Create Your Account</h2>
          <p>Start your fresh journey with us today</p>
          <div className="flex justify-center">2btn</div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col items-center gap-y-4 p-4"
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nameInput">Name*</FieldLabel>
                  <Input
                    {...field}
                    id="nameInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Name"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="emailInput">Email*</FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id="emailInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Email"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="passwordInput">Password*</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="passwordInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your password"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rePasswordInput">rePassword*</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="rePasswordInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your rePassword"
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
                  <FieldLabel htmlFor="phoneNumberInput">
                    PhoneNumber*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phoneNumberInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your PhoneNumber"
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
              Create My account
            </Button>
          </form>
          <p className="flex gap-3 justify-center">
            <span> Already have an account?</span>
            <Link className="text-green-700" href="/login">
              Sign In
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
