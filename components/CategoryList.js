import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return(
     <div className="mt-12 px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap:8">
      <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className='relative bg-slate-100 w-full h-96 '>
                    <Image src="/allproducts.jpg" alt='' fill sizes="20vw" className='object-cover' />
                </div>
                <h1 className='mt-8 font-light text-cl tracking-wide'>All products</h1>
            </Link>
            <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className='relative bg-slate-100 w-full h-96 '>
                    <Image src="/bags_babesKloset.jpg" alt='' fill sizes="20vw" className='object-cover' />
                </div>
                <h1 className='mt-8 font-light text-cl tracking-wide'>bags</h1>
            </Link>
            <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className='relative bg-slate-100 w-full h-96 '>
                    <Image src="/slippers_gucci.jpg" alt='' fill sizes="20vw" className='object-cover' />
                </div>
                <h1 className='mt-8 font-light text-cl tracking-wide'>Slippers</h1>
            </Link>
            <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className='relative bg-slate-100 w-full h-96 '>
                    <Image src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800" alt='' fill sizes="20vw" className='object-cover' />
                </div>
                <h1 className='mt-8 font-light text-cl tracking-wide'>Dresses</h1>
            </Link>
            <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className='relative bg-slate-100 w-full h-96 '>
                    <Image src="/watch_gold02.jpg" alt='' fill sizes="20vw" className='object-cover' />
                </div>
                <h1 className='mt-8 font-light text-cl tracking-wide'>Accessoirs</h1>
            </Link>
      </div>
  </div>
  );
};

export default CategoryList;
