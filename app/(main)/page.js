"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center p-24 w-full h-[100vh] gap-5">
      <h1 className="text-xl font-semibold">Landing page coming soon.....!</h1>
      <Button
        color="primary"
        variant="shadow"
        type="submit"
        className=" float-end mt-5"
        radius="sm"
        onClick={() => router.push("/trademark-register")}
      >
        Register Trademark
      </Button>
    </main>
  );
}
