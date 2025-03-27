"use client";
import React from "react";

const CustomizeProduct = ({ colors, sizes }) => {
  console.log(sizes);
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a Color</h4>
      <ul className="flex items-center gap-3">
        {colors.map((color) => (
          <li
            key={color}
            className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative"
            style={{ backgroundColor: color }} // set dynamic background color
          ></li>
        ))}
        {/* <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
          <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
          <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li> */}
      </ul>
      {sizes[0] !== "" && (
        <>
          <h4 className="font-medium">Choose a Size</h4>
          <ul className="flex items-center gap-3">
            {sizes.map((size) => (
              <li
                key={size}
                className="ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
              >
                {size}
              </li>
            ))}
          </ul>
        </>
      )}
      {/* <li className="ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer">
          Small
        </li>
        <li className="ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>
        <li className="ring-1 ring-blue-300 text-white bg-blue-300 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li> */}
    </div>
  );
};

export default CustomizeProduct;
