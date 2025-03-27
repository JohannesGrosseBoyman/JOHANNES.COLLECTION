"use client";

import Image from "next/image";
import React, { useState } from "react";



const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;
  

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((img, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={img}
            onClick={() => setIndex(i)}
          >
            <Image
              src={img}
              alt=""
              fill
              key={img}
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
