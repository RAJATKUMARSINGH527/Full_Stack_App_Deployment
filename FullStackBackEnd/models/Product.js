const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
},{ timestamps: true,
    versionKey: false,
 });



const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };

