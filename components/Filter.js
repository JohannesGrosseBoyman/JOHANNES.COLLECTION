import React from "react";

const Filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      <div className="mt-2 mb-2 flex flex-wrap gap-6">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-primary text-white"
        >
          <option value="">Type</option>
          <option value="physical">Physical</option>
          
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="pl-2 w-24 ring-1 ring-gray-400 rounded-xl text-xs"
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="pl-2 w-24 ring-1 ring-gray-400 rounded-xl text-xs"
        />
        <select
          name="size"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">Size</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
          <option value="xlarge">Xlarge</option>
        </select>
        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">Color</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">Category</option>
          <option value="dresses">Dresses</option>
          <option value="bags">Bags</option>
          <option value="slippers">Slippers</option>
          <option value="accessoirs">Accessoirs</option>
          <option value="men fashion">Men fashion</option>
        </select>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">All FIlters</option>
        </select>
      </div>
      <div className="mt-2">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-primary text-white"
        >
          <option value="">Sort By</option>
          <option value="asc">Price (low to high)</option>
          <option value="dsc">Price (high to low)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
