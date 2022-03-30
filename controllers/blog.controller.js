const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const Post = require("../models/Post.model");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");

exports.allBlogsGetController = async (req, res, next) => {
	try {
		let blogs = await Post.find().populate("author", "username");
		res.render("pages/blogs/show-blogs", {
		title: "All Blogs",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
		blogs
	});
	} catch (err) {
		next(err);
	}
	
};

exports.createBlogGetController = async (req, res, next) => {
	res.render("pages/blogs/create-new-blog", {
		title: "Create a New Blog",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
		errors: {},
		values: {},
	});
};

exports.createBlogPostPostController = async (req, res, next) => {
	const { title, body } = req.body;
	let thumbnail = req.file ? req.file.filename : "default-blog.jpg";
	let errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return res.render("pages/blogs/create-new-blog", {
			title: "Create a New Blog",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			errors: errors.mapped(),
			values: req.body,
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
		res.redirect("/blog");
	} catch (err) {
		next(err);
	}
};
