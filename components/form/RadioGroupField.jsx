"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

const RadioGroupField = ({ value }) => {
  const [selected, setSelected] = useState("name");

  console.log("select", selected);

  return (
    <div>
      <RadioGroup
        orientation="horizontal"
        value={selected}
        onValueChange={setSelected}
        className="gap-4"
      >
        <Radio value="name" className="text-red-800">
          Name
        </Radio>
        <Radio value="slogan">Slogan</Radio>
        <Radio value="logo">logo</Radio>
      </RadioGroup>
    </div>
  );
};

export default RadioGroupField;
