import React from "react";
import { Spinner } from "@/components/ui/spinner";
export default function loading() {
  return <div className="h-screen flex justify-center items-center"> <Spinner className="size-8 text-green-400"/></div>;
}
