"use client";
import { useState, useEffect } from "react";
import AddProductForm from "../../components/AddProductForm";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("add"); // add, edit, delete
  const [editingProduct, setEditingProduct] = useState(null);
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

  // Feta all products
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Handle input changes for editing product
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Set product to edit
  const handleEdit = (product) => {
    setView("edit"); // Switch to edit view
    setEditingProduct(product);
    setFormData({
      name: product.name,
      images: product.images.join(", "),
      price: product.price,
      discountedPrice: product.discountedPrice,
      colors: product.colors.join(", "),
      featured: product.featured,
      description: product.description,
      shortdesc: product.shortdesc,
      category: product.category,
      sizes: product.sizes.join(", "),
    });
  };

  // Handle form submission for editing product
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated values to arrays
    const formattedData = {
      ...formData,
      colors: formData.colors.split(",").map((color) => color.trim()),
      sizes: formData.sizes.split(",").map((size) => size.trim()),
      images: formData.images.split(",").map((url) => url.trim()),
    };

    try {
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Product updated successfully");
        setView("add");
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  // Handle delete product
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Product deleted successfully");
      } else {
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold my-4">
        Admin Panel: Manage Products
      </h1>

      {/* View Selection */}
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 rounded-md ${
            view === "add" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("add")}
        >
          Add Product
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            view === "edit" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("edit")}
        >
          Edit Product
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            view === "delete" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("delete")}
        >
          Delete Product
        </button>
      </div>
      {/* Add Product Form */}
      {view === "add" && <AddProductForm />}

      {/* Edit Product Form */}
      {view === "edit" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product._id}
                className="p-4 border rounded flex justify-between"
              >
                <span>
                  {product.name} - GHS{product.price}
                </span>
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-blue-500 text-white"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>

          {editingProduct && (
            <form
              onSubmit={handleEditSubmit}
              className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleEditChange}
                  placeholder="Product Name"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleEditChange}
                  placeholder="Product Images (comma-separated URLs)"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleEditChange}
                  placeholder="Discounted Price"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleEditChange}
                  placeholder="Colors (comma-separated)"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleEditChange}
                  className="mr-2"
                />
                <label htmlFor="featured">Featured</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <textarea
                  name="shortdesc"
                  value={formData.shortdesc}
                  onChange={handleEditChange}
                  placeholder="Short Description"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleEditChange}
                  placeholder="Category"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleEditChange}
                  placeholder="Sizes (comma-separated)"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-primary text-white py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Delete Product View */}
      {view === "delete" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Delete Product</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product._id}
                className="p-4 border rounded flex justify-between"
              >
                <span>
                  {product.name} - GHS{product.price}
                </span>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-2 py-1 bg-red-500 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
