"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import PropTypes from "prop-types";

const BlogCard = ({ img, title, desc, searchTerm, maxDescLength = 130, isLoading }) => {
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card
      className="grid grid-rows-2 h-fit items-center p-4"
      radius="lg"
    >
      <Skeleton isLoaded={!isLoading} className="rounded-lg">
        <div className="w-full mx-auto h-fit rounded-lg">
          <Image
            src={img}
            alt={title}
            width={200}
            height={300}
            className="w-auto h-auto bg-cover rounded-lg"
          />
        </div>
      </Skeleton>

      <div className="w-full flex flex-col gap-2">
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <div className="text-[16px] leading-[20px] font-[700]">
            {highlightText(title)}
          </div>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="rounded-lg mb-4">
          <div className="text-[14px] leading-[18px] text-black/70 font-[400]">
            {highlightText(desc.substring(0, maxDescLength))}
            {desc.length > maxDescLength && (
              <span className="text-blue-500 cursor-pointer ml-1">
                ...read more
              </span>
            )}
          </div>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <Button className="h-[53px] w-full rounded-lg text-white bg-primary">
            Read Blog
          </Button>
        </Skeleton>
      </div>
    </Card>
  );
};

BlogCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  maxDescLength: PropTypes.number,
  isLoading: PropTypes.bool.isRequired, 
};

export default BlogCard;
