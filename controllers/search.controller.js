const { gettingAllOrder } = require("../utils/ordersManage");

exports.searchPostController = async (req, res, next) => {
	res.render("pages/search/search", {
		title: "Search Result",
		flashMessage: {},
		orders: await gettingAllOrder(req, next),
	});
};
