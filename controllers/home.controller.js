const Flash = require("../utils/Flash");

exports.homeGetController = (req, res) => {
	res.render("pages/home", {
		title: "Coffee Shop",
		values: {},
		flashMessage: Flash.getMessage(req),
		errors: {},
	});
};

exports.homePostController = async (req, res, next) => {
	req.flash("success", "Order placed successfully");
	res.render("pages/home", {
		title: "Coffee Shop",
		values: {},
		flashMessage: Flash.getMessage(req),
		errors: {},
	});
};
