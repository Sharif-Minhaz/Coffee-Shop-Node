const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const Post = require("../models/Post.model");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");

exports.allBlogsGetController = async (req, res, next) => {
	res.render("pages/blogs/show-blogs", {
		title: "All Blogs",
		flashMessage: {},
		orders: await gettingAllOrder(req, next),
	});
};

exports.createBlogGetController = async (req, res, next) => {
	res.render("pages/blogs/create-new-blog", {
		title: "Create a New Blog",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
	});
};

exports.createBlogPostPostController = async (req, res, next) => {
	const { title, body } = req.body;
	console.log(req.body);
	let thumbnail = req.file ? req.file.filename : "";
	let errors = validationResult(req).formatWith(errorFormatter);
	console.log(errors);
	if (!errors.isEmpty()) {
		return res.render("pages/blogs/create-new-blog", {
			title: "Create a New Blog",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			errors,
		});
	}
	let blogPost = new Post({
		title,
		body,
		author: req.user._id,
		thumbnail,
	});
	try {
		await blogPost.save();
		req.flash("success", "Post created successfully");
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
