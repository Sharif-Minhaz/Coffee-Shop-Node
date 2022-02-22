const Flash = require("../utils/Flash");

exports.homeGetController = (req, res) => {
	res.render("pages/home", {
		title: "Coffee Shop",
		values: {},
		flashMessage: Flash.getMessage(req),
		errors: {},
	});
};
