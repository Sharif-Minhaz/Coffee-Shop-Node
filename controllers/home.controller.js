const Checkout = require("../models/Checkout.model");
const Flash = require("../utils/Flash");

exports.homeGetController = async (req, res, next) => {
	try {
		if (req.user) {
			let orders = await Checkout.find({ user: req.user._id });
			return res.render("pages/home", {
				title: "Coffee Shop",
				values: {},
				flashMessage: Flash.getMessage(req),
				errors: {},
				orders,
			});
		}
		res.render("pages/home", {
			title: "Coffee Shop",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: {},
		});
	} catch (err) {
		next(err);
	}
};

exports.homePostController = async (req, res, next) => {
	const { checkoutProductName, productImg, checkoutPrice, quantity } = req.body;
	let order = new Checkout({
		user: req.user._id,
		checkoutProductName,
		productImg,
		checkoutPrice,
		quantity,
	});
	try {
		await order.save();
		req.flash("success", "Order placed successfully");
		let orders = await Checkout.find({ user: req.user._id });
		res.render("pages/home", {
			title: "Coffee Shop",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders,
		});
	} catch (err) {
		next(err);
	}
};
