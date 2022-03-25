const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");
const fs = require("fs");

exports.menuGetController = async (req, res, next) => {
	try {
		let menus = await Menu.find();
		res.render("pages/menu/menu", {
			title: "Coffee Shop | Menu",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			menus,
		});
	} catch (err) {
		next(err);
	}
};

exports.menuAddPostController = async (req, res, next) => {
	let { addProductName, addProductPrice, category, description } = req.body;
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
			description,
		});

		await newMenu.save();
		req.flash("success", "Product added successfully");
		res.redirect("/menu/all");
	} catch (err) {
		next(err);
	}
};

exports.singleMenuGetController = async (req, res, next) => {
	let itemId = req.params.id;
	try {
		let selectedItems = await Menu.findById(itemId).populate({
			path: "reviews.user",
			model: "User",
		});
		let relatedProduct = await Menu.find().limit(3);
		res.render("pages/menu/view-single-menu", {
			title: "View Menu",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			selectedItems,
			relatedProduct,
			errors: {},
		});
	} catch (err) {
		next(err);
	}
};

exports.reviewPostController = async (req, res, next) => {
	const { selectedItemsId, reviewBody } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	try {
		if (!errors.isEmpty()) {
			let selectedItems = await Menu.findById(selectedItemsId).populate({
				path: "reviews.user",
				model: "User",
			});
			
			let relatedProduct = await Menu.find().limit(3);
			req.flash("fail", "Review body can not be empty");
			return res.render("pages/menu/view-single-menu", {
				title: "View Menu",
				flashMessage: Flash.getMessage(req),
				orders: await gettingAllOrder(req, next),
				selectedItems,
				relatedProduct,
				errors: errors.mapped(),
			});
		}
		await Menu.updateOne(
			{ _id: selectedItemsId },
			{
				$push: {
					reviews: {
						body: reviewBody,
						user: req.user._id,
					},
				},
			}
		);
		res.redirect(`/menu/view/${selectedItemsId}`);
	} catch (err) {
		next(err);
	}
};
