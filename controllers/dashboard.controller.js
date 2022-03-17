exports.dashboardGetController = async (req, res, next) => {
	res.render("pages/dashboard/dashboard", { title: "Admin Dashboard", flashMessage: {} });
};
