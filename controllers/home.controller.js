exports.homeGetController = (req, res) => {
	res.render("pages/home", {
		title: "Coffee Shop",
		values: {},
		flashMessage: {},
		errors: {},
	});
};
