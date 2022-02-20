const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		productImage: {
			type: String,
			required: true,
		},
		productDes: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;