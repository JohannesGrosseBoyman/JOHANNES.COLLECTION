'use client';
import { useParams } from "next/navigation";
import useSWR from "swr";
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
        <h1 className="text-2xl">Products of Category: {categoryName}</h1>
        
        <ProductList products={data} />  {/* Pass filtered products */}
    </div>
  )
}

export default CategoryPage;