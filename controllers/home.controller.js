const Checkout = require("../models/Checkout.model");
const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");

exports.homeGetController = async (req, res, next) => {
	try {
		let menus = await Menu.find().limit(6);
		if (req.user) {
			return res.render("pages/home", {
				title: "Coffee Shop",
				values: {},
				flashMessage: Flash.getMessage(req),
				errors: {},
				orders: req.session.orders,
				menus,
			});
		}
		res.render("pages/home", {
			title: "Coffee Shop",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: {},
			menus,
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
		let menus = await Menu.find().limit(6);
		let orders = await Checkout.find({ user: req.user._id });
		req.session.orders = orders;
		res.render("pages/home", {
			title: "Coffee Shop",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: req.session.orders,
			menus,
		});
	} catch (err) {
		next(err);
	}
};
