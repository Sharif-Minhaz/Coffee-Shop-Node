exports.createProfileGetController = (req, res, next) => {
	res.render("pages/profile/create-profile", {
		title: "Coffee Shop | Create Profile",
		flashMessage: {},
		errors: {},
	});
};
