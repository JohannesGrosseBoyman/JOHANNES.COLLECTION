'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductList = () => {

    const { data, error, isLoading } = useSWR("/api/products", fetcher);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading categories</div>;
    if (!data) return <div>No categories found</div>;

    console.log(data);
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap ">
      {data.map((product) => (
        <Link
        href={`/${product._id}`}
        key={product._id}
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
      >
        <div className="relative w-full h-80">
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src={product.images[1] || product.images[0]}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{product.name}</span>
          <span className="font-semibold">{`GHS ${product.price}`}</span>
        </div>
        <div className="text-sm text-gray-500">{product.shortdesc}</div>

        <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      ))}
      {/* Before connect to Database 
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
      >
        <div className="relative w-full h-80">
          <Image
            src="/bag_black.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="/bag_black02.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">GHS 195</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>

        <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
      >
        <div className="relative w-full h-80">
          <Image
            src="/bag_black.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="/bag_black02.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">GHS 195</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>

        <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
      >
        <div className="relative w-full h-80">
          <Image
            src="/bag_black.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="/bag_black02.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">GHS 195</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>

        <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
      >
        <div className="relative w-full h-80">
          <Image
            src="/bag_black.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="/bag_black02.jpg"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">GHS 195</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>

        <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      */}
    </div>
  );
};

export default ProductList;
