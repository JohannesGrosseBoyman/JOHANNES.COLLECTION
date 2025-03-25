import React from "react";
import ProductImages from "../../components/ProductImages";
import CustomizeProduct from '@/components/CustomizeProduct';
import Add from '@/components/Add';

const SingelPage = () => {
  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* Texts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className="h-[2px] bg-gray-100"/>
        <div className="flex items-center gap-4"> 
            <h3 className="text-xl text-gray-500 line-through">GHS 205</h3>
            <h2 className="font-medium text-2xl">GHS 190</h2>
        </div>
        <div className="h-[2px] bg-gray-100"/>
        <CustomizeProduct />
        <Add />
        <div className="h-[2px] bg-gray-100"/>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
        </div>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
        </div>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
        </div>
      </div>
    </div>
  );
};

export default SingelPage;
