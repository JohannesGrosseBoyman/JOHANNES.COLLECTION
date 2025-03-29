"use client";
import React from "react";
import ProductImages from "../../components/ProductImages";
import CustomizeProduct from "@/components/CustomizeProduct";
import Add from "@/components/Add";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const { slug } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  const discount = product.discountedPrice !== "" ? true : false;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to cart.");
      return;
    }
    const cartItem = {
      id: product.id,
      name: product.name,
      price: discount ? product.discountedPrice : product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: product.images[0],
    };
    // Dispatch to global sate or store in local storage
    console.log("Added to cart:", cartItem);
  };

  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={product.images} />
      </div>
      {/* Texts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />

        {!discount ? (
          <div className="flex items-center gap-4">
            <h2 className="font-medium text-2xl">GHS {product.price}</h2>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              GHS {product.price}
            </h3>
            <h2 className="font-medium text-2xl">
              GHS {product.discountedPrice}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />
        <CustomizeProduct
          colors={product.colors}
          sizes={product.sizes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <Add
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
        <div className="h-[2px] bg-gray-100" />
      </div>
    </div>
  );
};

export default SingleProductPage;
