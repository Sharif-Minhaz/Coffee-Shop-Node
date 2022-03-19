const { model, Schema } = require("mongoose");

const menuSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		default: "menu",
	},
});

menuSchema.index(
	{
		name: "text",
		price: "text",
	},
	{
		weights: {
			name: 5,
			price: 5,
		},
	}
);

const Menu = model("Menu", menuSchema);

module.exports = Menu;
