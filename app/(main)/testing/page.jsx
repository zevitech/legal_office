import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-svh flex items-center justify-center">
      <Link
        href={"/trademark-register/thank-you"}
        className="text-xl font-bold text-black underline"
      >
        Redirect Me
      </Link>
    </div>
  );
};

export default page;
