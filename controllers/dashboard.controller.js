const Subscribe = require("../models/Subscribe.model");

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
