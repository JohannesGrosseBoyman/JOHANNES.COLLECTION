"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoryList = () => {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  if (!data) return <div>No categories found</div>;
  



  return (
    <div className="mt-12 px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap:8">
        {data.map((category) => (
          <Link
            href={`/category/${encodeURIComponent(category.name)}`}
            key={category._id}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96 ">
              <Image
                src={category.url}
                alt={category.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">
              {category.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
