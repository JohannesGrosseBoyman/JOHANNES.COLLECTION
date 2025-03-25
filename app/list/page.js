import React from "react";
import Image from "next/image";
import Filter from "../../components/Filter";
import ProductList from "../../components/ProductList";

const ListPage = () => {
  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col justify-center gap-8">
          <h1 className="text-xl md:text-3-xl lg:text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">
            Buy now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="onject-contain" />
        </div>
      </div>
      {/* Filter */}
      <Filter />
      {/* Products */}
      <h1 className="text-xl font-semibold">Dresses for You!</h1>
      <ProductList />
    </div>
  );
};

export default ListPage;
