const Checkout = require("../models/Checkout.model");
const Flash = require("../utils/Flash");

exports.homeGetController = async (req, res, next) => {
	try {
		if (req.user) {
			return res.render("pages/home", {
				title: "Coffee Shop",
				values: {},
				flashMessage: Flash.getMessage(req),
				errors: {},
				orders: req.session.orders,
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
		req.session.orders = orders;
		res.render("pages/home", {
			title: "Coffee Shop",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: req.session.orders,
		});
	} catch (err) {
		next(err);
	}
};
