const { model, Schema } = require("mongoose");

const checkoutSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	checkoutProductName: {
		type: String,
		required: true,
	},
	productImg: {
		type: String,
		required: true,
	},
	checkoutPrice: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const Checkout = model("Checkout", checkoutSchema);

module.exports = Checkout;
