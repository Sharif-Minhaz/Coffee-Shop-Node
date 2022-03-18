const Subscribe = require("../models/Subscribe.model");
const Menu = require("../models/Menu.model");
const fs = require("fs");

exports.dashboardGetController = (req, res) => {
	res.render("pages/dashboard/dashboard", { title: "Admin Dashboard", flashMessage: {} });
};

exports.subscribeGetController = async (req, res, next) => {
	try {
		const subscribedMail = await Subscribe.find();
		return res.render("pages/dashboard/subscription", {
			title: "Show Subscription",
			flashMessage: {},
			subscribedMail,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteMailGetController = async (req, res, next) => {
	const mailId = req.params.id;
	try {
		await Subscribe.findByIdAndDelete(mailId);
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
			err && console.log(err);
		});
		await Menu.findByIdAndDelete(menuId);
		res.redirect("/dashboard/edit-item");
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

	try {
		await Menu.findByIdAndUpdate(itemId, {
			name: productName,
			image: modImg,
			price: "$" + productPrice,
		});
	} catch (err) {
		next(err);
	}

	res.redirect("/dashboard/edit-item");
};
