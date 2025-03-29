'use client';
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";


const fetcher = (url) => fetch(url).then((res) => res.json());


const CategoryPage = () => {
    const { name } = useParams(); //Get category name from the URL

    // Decode the category name from URL encoding
    const categoryName = decodeURIComponent(name);
    

    // Fetch products filtered by category name
    const { data, error, isLoading } = useSWR(`/api/products?category=${categoryName}`, fetcher);

    


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;
    if (!data || data.length === 0) return <div>No products found for this category</div>;




  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12"> 
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
        
        <h1 className="mt-4 text-2xl">{categoryName} for You!</h1>
        
        <ProductList products={data} />  {/* Pass filtered products */}
    </div>
  )
}

export default CategoryPage;