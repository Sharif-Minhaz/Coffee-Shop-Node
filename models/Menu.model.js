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
	description: {
		type: String,
	},
	availability: {
		type: String,
		default: "In Stock",
	},
	category: {
		type: String,
		default: "menu",
	},
	stars: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			body: {
				type: String,
				required: true,
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			creation: {
				type: Date,
				default: new Date(),
			},
		},
	],
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
