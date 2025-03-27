'use client';

import { useState } from "react";

export default function AddProductForm() {
    const [formData, setFormData] = useState({
        name: "",
        images: "",
        price: "",
        discountedPrice: "",
        colors: "",
        featured: false,
        description: "",
        shortdesc: "",
        category: "",
        sizes: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert comma-separated values to arrays
        const formattedData = {
            ...formData,
            colors: formData.colors.split(",").map((color) => color.trim()),
            sizes: formData.sizes.split(",").map((size) => size.trim()),
            images: formData.images.split(",").map((url) => url.trim()),
        };

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
            
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setMessage("Product added successfully");

                setFormData({
                    name: "",
                    images: "",
                    price: "",
                    discountedPrice: "",
                    colors: "",
                    featured: false,
                    description: "",
                    shortdesc: "",
                    category: "",
                    sizes: "",
                });
            } else {
                setMessage(result.message || "Error adding product");
            }

        } catch (error) {
            console.error("Error adding product:", error);
            setMessage("Error adding product");
        }
    };

   return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="Image URLs (comma-separated)"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    placeholder="Discounted Price"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="Colors (comma-separated)"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="featured">Featured Product</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    name="shortdesc"
                    value={formData.shortdesc}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    placeholder="Sizes (comma-separated)"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="bg-primary text-white py-2 rounded-md">
                    Add Product
                </button>
            </div>
        </form>
    </div>
   );
}
