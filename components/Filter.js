import React from "react";

const Filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex flex-wrap gap-6">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-primary text-white"
        >
          <option value="">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
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
        </select>
        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">Color</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
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
          <option value="accessoiries">Accessoiries</option>
        </select>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-gray-300 text-black"
        >
          <option value="">All FIlters</option>
        </select>
      </div>
      <div>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-xl text-xs font-medium bg-primary text-white"
        >
          <option value="">Sort By</option>
          <option value="physical">Price (low to high)</option>
          <option value="digital">Price (high to low)</option>
          <option value="digital">Newest</option>
          <option value="digital">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
