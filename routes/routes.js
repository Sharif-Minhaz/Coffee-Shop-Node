const router = require("express").Router();
const homeRoute = require("./home.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		route.path == "/" ? app.get(route.path, route.handler) : app.use(route.path, route.handler);
	});
};
