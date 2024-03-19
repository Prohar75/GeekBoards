import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    photos: [String],
    description: String,
});

const productModel = new mongoose.model('Product',productSchema);
export default productModel;