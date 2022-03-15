const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");
const fs = require("fs");

exports.menuGetController = async (req, res, next) => {
	let menus;
	try {
		menus = await Menu.find({category: "menu"});
	} catch (err) {
		next(err);
	}
	res.render("pages/menu/menu", {
		title: "Coffee Shop | Menu",
		flashMessage: Flash.getMessage(req),
		orders: req.session.orders,
		menus,
	});
};

exports.menuAddPostController = async (req, res, next) => {
	let { addProductName, addProductPrice, category } = req.body;
	let onlyPrice = Number(addProductPrice).toFixed(2);
	addProductPrice = "$" + onlyPrice;

	try {
		let check = await Menu.find({ name: addProductName });
		if (check.length > 0) {
			req.flash("fail", "Product already exists");
			// removing the unused uploaded menu image
			fs.unlink(`public/uploads/${req.file.filename}`, (err) => {
				err && console.error(err);
			});
			return res.redirect("/menu/all");
		}
		let newMenu = new Menu({
			name: addProductName,
			image: req.file.filename,
			price: addProductPrice,
			category,
		});

		await newMenu.save();
		req.flash("success", "Product added successfully");
		res.redirect("/menu/all");
	} catch (err) {
		next(err);
	}
};

exports.checkoutProduct = (req, res, next) => {
	res.send("Checkout product");
};

exports.productAddPostController = (req, res, next) => {
	res.send("add product");
};
