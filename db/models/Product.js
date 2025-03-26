import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true},
    price: { type: String, required: true },
    discountedPrice: { type: String, required: false },
    colors: { type: Array, required: true },
    featured: { type: Boolean, required: false },
    description: { type: String, required: true },
    shortdesc: { type: String, required: false },
    category: { type: String, required: true },
    sizes: { type: Array, required: true },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;