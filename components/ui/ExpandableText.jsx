"use client";
import React, { useState } from "react";

const ExpandableText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const first30Words = text.split(" ").slice(0, 30).join(" ");

  return (
    <div className="transition-all duration-300">
      <p>
        {isExpanded ? text : `${first30Words}...`}{" "}
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-color-primary font-medium cursor-pointer"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </span>
      </p>
    </div>
  );
};

export default ExpandableText;
