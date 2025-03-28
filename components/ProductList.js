"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PRODUCTS_PER_PAGE = 4;

const ProductList = ({ featuredOnly = false, products }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch all products only if no products are passed as props
  const { data, error, isLoading } = useSWR(products ? null : "/api/products", fetcher);

  const finalProducts = products || data; // Use passed products or fetched data

  if (!finalProducts) return <div>No products available</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
 

  // Filter products if "featuredOnly" is true
  const filteredProducts = featuredOnly
    ? finalProducts.filter((product) => product.featured)
    : finalProducts;

  // Check if pagination is needed
  const shouldPaginate = filteredProducts.length > PRODUCTS_PER_PAGE;

  // Calculate pagination
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  // Determine button states
  const hasPrevious = currentPage > 0;
  const hasNext = filteredProducts.length > startIndex + PRODUCTS_PER_PAGE;

  return (
    <div className="mt-12 mb-12>">
      <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap ">
        {paginatedProducts.map((product) => (
          <Link
            href={`/${product._id}`}
            key={product._id}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] min-h-[400px] " // Ensures all product cards are the same height
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
            {/* This div grows to push the button to the bottom */}
            <div className="flex flex-col flex-grow" >
            <div className="flex justify-between">
              <span className="font-medium w-2/3">{product.name}</span>
              <span className="font-semibold">{`GHS ${product.price}`}</span>
            </div>
            </div>
            {/* Ensure a fixed height for description*/}
            <div className="text-sm text-gray-500 min-h-[40px]">{product.shortdesc}</div>
            
            {/* Button is pushed to the bottom */}
            <button className=" rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
      {/* Pagination Controls */}
      {shouldPaginate && (
        <div className="flex justify-between gap-4 mt-8">
          <button
            disabled={!hasPrevious}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`w-30 px-4 py-2 ring-1 rounded-md ${
              hasPrevious
                ? "bg-primary text-white cursor-pointer hover:bg-primary-dark"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-semibold`}
          >
            Previous
          </button>
          <button
            disabled={!hasNext}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`w-30 px-4 py-2 border rounded-md ${
              hasNext
                ? "bg-primary text-white cursor-pointer hover:bg-primary-dark"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-semibold`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
