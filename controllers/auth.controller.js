const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");
const Flash = require("../utils/Flash");

exports.loginGetController = (req, res, next) => {
	res.render("pages/auth/login", {
		title: "Coffee Shop | Login",
		flashMessage: {},
		errors: {},
		values: {},
	});
};

exports.loginPostController = (req, res, next) => {
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields.");
		return res.render("pages/auth/login", {
			title: "Coffee Shop | Login",
			flashMessage: {},
			errors: errors.mapped(),
			values: req.body,
		});
	}

	res.redirect("/");

};

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", {
		title: "Coffee Shop | Signup",
		flashMessage: {},
		errors: {},
		values: {},
	});
};

exports.signupPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		req.flash("fail", "Please Check the fields");
		return res.render("pages/auth/signup", {
			title: "Coffee Shop | Signup",
			errors: errors.mapped(),
			values: req.body,
			flashMessage: Flash.getMessage(req),
		});
	}

	try {
		let hashedPassword = await bcrypt.hash(password, 10);

		let user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();
		req.flash("success", "User created successfully");
		res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};
