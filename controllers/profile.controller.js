const Profile = require("../models/Profile.model");
const Reservation = require("../models/Reservation.model");
const Checkout = require("../models/Checkout.model");
const Flash = require("../utils/Flash");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");

let orders;

exports.createProfileGetController = async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user._id });
		if (profile) {
			return res.redirect("/profile/show-profile");
		}
		// calling gettingAllOrder
		gettingAllOrder(req, next);
		res.render("pages/profile/create-profile", {
			title: "Coffee Shop | Create Profile",
			flashMessage: {},
			errors: {},
			values: {},
			orders,
		});
	} catch (err) {
		next(err);
	}
};

exports.createProfilePostController = async (req, res, next) => {
	const { name, email, title, bio, website } = req.body;

	let errors = validationResult(req).formatWith(errorFormatter);
	// calling gettingAllOrder
	gettingAllOrder(req, next);
	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields");
		return res.render("pages/profile/create-profile", {
			title: "Coffee Shop | Create Profile",
			flashMessage: Flash.getMessage(req),
			errors: errors.mapped(),
			values: req.body,
			orders,
		});
	}

	const profile = new Profile({
		user: req.user._id,
		name,
		email,
		title,
		bio: bio || "",
		website: website || "",
	});
	try {
		await profile.save();
		req.flash("success", "Profile created successfully");
		return res.redirect("/profile/show-profile");
	} catch (err) {
		next(err);
	}
	res.send("Profile");
};

exports.profileGetController = async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user._id });
		const reservation = await Reservation.find({ user: req.user._id });
		if (!profile) {
			return res.redirect("/profile/create-profile");
		}
		// calling gettingAllOrder
		gettingAllOrder(req, next);
		res.render("pages/profile/show-profile", {
			title: "Coffee Shop | Profile",
			errors: {},
			flashMessage: Flash.getMessage(req),
			values: {},
			profile,
			orders,
			reservation,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateProfileGetController = async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user._id });
		if (!profile) {
			return res.redirect("/profile/create-profile");
		}
		// calling gettingAllOrder
		gettingAllOrder(req, next);
		res.render("pages/profile/edit-profile", {
			title: "Coffee Shop | Edit Profile",
			errors: {},
			flashMessage: {},
			values: {},
			profile,
			orders,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateProfilePostController = async (req, res, next) => {
	const { name, title, bio, website } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);
	// calling gettingAllOrder
	gettingAllOrder(req, next);
	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields");
		return res.render("pages/profile/create-profile", {
			title: "Coffee Shop | Create Profile",
			flashMessage: Flash.getMessage(req),
			errors: errors.mapped(),
			values: req.body,
			orders,
		});
	}

	let profile = {
		name,
		title,
		bio: bio || "",
		website: website || "",
	};

	try {
		await Profile.findOneAndUpdate({ user: req.user._id }, profile);

		req.flash("success", "Profile updated successfully");
		return res.redirect("/profile/show-profile");
	} catch (err) {
		next(err);
	}
};

// getting orders 
const gettingAllOrder = async (req, next) => {
	try {
		orders = await Checkout.find({ user: req.user._id });
	} catch (err) {
		next(err);
	}
}