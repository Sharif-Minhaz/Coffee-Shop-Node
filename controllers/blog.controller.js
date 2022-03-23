const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");

exports.createBlogGetController = async (req, res, next) => {
	res.render("pages/blogs/create-new-blog", {
		title: "Create a New Blog",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
	});
};
