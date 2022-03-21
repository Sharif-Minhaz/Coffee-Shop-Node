const Subscribe = require("../models/Subscribe.model");
const Reservation = require("../models/Reservation.model");
const Checkout = require("../models/Checkout.model");
const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const { sendNotification } = require("../utils/twilio");
const fs = require("fs");

exports.dashboardGetController = async (req, res, next) => {
	res.render("pages/dashboard/dashboard", {
		title: "Admin Dashboard",
		flashMessage: {},
		orders: await gettingAllOrder(req, next),
	});
};

exports.subscribeGetController = async (req, res, next) => {
	try {
		const subscribedMail = await Subscribe.find();
		return res.render("pages/dashboard/subscription", {
			title: "Show Subscription",
			flashMessage: Flash.getMessage(req),
			subscribedMail,
			orders: await gettingAllOrder(req, next),
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
			orders: await gettingAllOrder(req, next),
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
			orders: await gettingAllOrder(req, next),
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
		let checkout = await Checkout.findByIdAndUpdate(orderId, {
			status: "delivering",
		});
		await sendNotification(
			`Hurrah! your order for ${checkout.checkoutProductName} ${checkout.quantity}x total price: ${checkout.checkoutPrice} is successfully placed. Delivery boy on the way. --CAFE`,
			checkout.phone
		);
		req.flash("success", "Delivery sent to the Delivery boy");
		res.redirect("/dashboard/checkouts/all#show-checkout");
	} catch (err) {
		next(err);
	}
};

exports.cancelOrderGetController = async (req, res, next) => {
	let orderId = req.params.id;
	try {
		let checkout = await Checkout.findByIdAndUpdate(orderId, {
			status: "pending",
		});
		await sendNotification(
			`Sorry! your order for ${checkout.checkoutProductName} ${checkout.quantity}x is delayed for some problem. Soon we will let you know if the order is cancelled or proceed. --CAFE`,
			checkout.phone
		);
		req.flash("success", "Order cancelled successfully");
		res.redirect("/dashboard/checkouts/all#show-checkout");
	} catch (err) {
		next(err);
	}
};

// show all checkout...
const showAllCheckout = async (req, res, next) => {
	try {
		const allOrders = await Checkout.find().populate("user", "username");
		res.render("pages/dashboard/show-checkout", {
			title: "All Checkout Details",
			flashMessage: Flash.getMessage(req),
			allOrders,
			orders: await gettingAllOrder(req, next),
		});
	} catch (err) {
		next(err);
	}
};
