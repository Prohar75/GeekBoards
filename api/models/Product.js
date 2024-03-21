import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    photos: [String],
    description: String,
});

const productModel = new mongoose.model('Product',productSchema);
export default productModel;