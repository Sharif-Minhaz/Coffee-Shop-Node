const Subscribe = require("../models/Subscribe.model");
const Reservation = require("../models/Reservation.model");
const Checkout = require("../models/Checkout.model");
const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");
const fs = require("fs");

exports.dashboardGetController = (req, res) => {
	res.render("pages/dashboard/dashboard", {
		title: "Admin Dashboard",
		flashMessage: {},
		orders: req.session.orders,
	});
};

exports.subscribeGetController = async (req, res, next) => {
	try {
		const subscribedMail = await Subscribe.find();
		return res.render("pages/dashboard/subscription", {
			title: "Show Subscription",
			flashMessage: Flash.getMessage(req),
			subscribedMail,
			orders: req.session.orders,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteMailGetController = async (req, res, next) => {
	const mailId = req.params.id;
	try {
		await Subscribe.findByIdAndDelete(mailId);
		req.flash("success", "Mail deleted successfully");
		res.redirect("/dashboard/subscription");
	} catch (err) {
		next(err);
	}
};

exports.editItemGetController = async (req, res, next) => {
	try {
		const menus = await Menu.find();
		res.render("pages/dashboard/edit-items", {
			title: "Edit Items",
			flashMessage: {},
			menus,
			orders: req.session.orders,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteItemGetController = async (req, res, next) => {
	const menuId = req.params.id;
	try {
		let itemImg = await Menu.findById(menuId).select({ image: 1, _id: 0 });
		fs.unlink(`public/uploads/${itemImg.image}`, (err) => {
			err && console.error(err);
		});
		await Menu.findByIdAndDelete(menuId);
		res.redirect("/dashboard/edit-item#menu");
	} catch (err) {
		next(err);
	}
};

exports.editItemPostController = async (req, res, next) => {
	const { itemId, productName, productPrice, prevImg } = req.body;
	let modImg;
	if (req.file) {
		modImg = req.file.filename;
		// removing the previous image from local storage
		fs.unlink(`public/uploads/${prevImg}`, (err) => {
			err && console.error(err);
		});
	} else {
		modImg = prevImg;
	}
	let price = "$" + Number(productPrice).toFixed(2);
	try {
		await Menu.findByIdAndUpdate(itemId, {
			name: productName,
			image: modImg,
			price,
		});
	} catch (err) {
		next(err);
	}
	res.redirect("/dashboard/edit-item#menu");
};

exports.reservationGetController = async (req, res, next) => {
	try {
		const reservation = await Reservation.find().populate("user", "username");
		res.render("pages/dashboard/reservation", {
			title: "Reservation",
			flashMessage: Flash.getMessage(req),
			reservation,
			orders: req.session.orders,
		});
	} catch (err) {
		next(err);
	}
};

exports.reservationApproveGetController = async (req, res, next) => {
	let reserveId = req.params.id;
	try {
		await Reservation.findByIdAndUpdate(reserveId, {
			status: "Approved",
		});
		req.flash("success", "Reservation request approved!");
		res.redirect("/dashboard/reservation");
	} catch (err) {
		next(err);
	}
};

exports.reservationRejectGetController = async (req, res, next) => {
	let reserveId = req.params.id;
	try {
		await Reservation.findByIdAndDelete(reserveId);
		req.flash("success", "Reservation request rejected!");

		res.redirect("/dashboard/reservation#all-subscribed-mail");
	} catch (err) {
		next(err);
	}
};

exports.showAllCheckoutGetController = async (req, res, next) => {
	try {
		showAllCheckout(req, res);
	} catch (err) {
		next(err);
	}
};

exports.deliverOrderGetController = async (req, res, next) => {
	let orderId = req.params.id;
	try {
		await Checkout.findByIdAndUpdate(orderId, {
			status: "delivering",
		});
		req.flash("success", "Delivery sent to the Delivery boy");
		showAllCheckout(req, res, next);
	} catch (err) {
		next(err);
	}
};

exports.cancelOrderGetController = async (req, res, next) => {
	let orderId = req.params.id;
	try {
		await Checkout.findByIdAndUpdate(orderId, {
			status: "pending",
		});
		req.flash("success", "Order cancelled successfully");
		showAllCheckout(req, res, next);
	} catch (err) {
		next(err);
	}
};

// show all checkout...

const showAllCheckout = async (req, res, next) => {
	try {
		const allOrders = await Checkout.find().populate("user", "username");
		const orders = await Checkout.find({ user: req.user._id });
		console.log(orders);
		req.session.orders = orders;
		req.session.save((err) => {
			if (err) {
				next(err);
			} else {
				res.render("pages/dashboard/show-checkout", {
					title: "All Checkout Details",
					flashMessage: Flash.getMessage(req),
					allOrders,
					orders: req.session.orders,
				});
			}
		});
	} catch (err) {
		next(err);
	}
};
