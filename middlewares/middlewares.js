const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");

const middlewares = [
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: "my-secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 2, // 2 hours
		},
	}),
	flash(),
];

module.exports = (app) => {
	middlewares.forEach((middleware) => {
		app.use(middleware);
	});
};
