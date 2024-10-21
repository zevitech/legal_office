"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const TMButton = ({ px, py, text, color, full }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button
      as={Link}
      href="/trademark-register"
      className={`px-14 font-semibold bg-color-primary text-white w-fit capitalize max-md:w-full ${
        full && `w-full`
      }`}
      radius="sm"
      style={{ padding: `${py} ${px}`, background: `${color}` }}
      isLoading={isLoading}
      onClick={() => setLoading(true)}
    >
      {text}
    </Button>
  );
};

export default TMButton;
