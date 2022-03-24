const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const Post = require("../models/Post.model");

exports.createBlogGetController = async (req, res, next) => {
	res.render("pages/blogs/create-new-blog", {
		title: "Create a New Blog",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
	});
};

exports.createBlogPostPostController = async (req, res, next) => {
	const { title, body } = req.body;
	let thumbnail = req.file ? req.file.filename : "";
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

exports.reviewPostController = async (req, res, next) => {
	req.flash("fail", "Login is required for review");
	res.redirect("/");
};