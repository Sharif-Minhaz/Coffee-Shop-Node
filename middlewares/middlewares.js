const express = require("express");

const middlewares = [
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
];

module.exports = (app) => {
    middlewares.forEach((middleware)=> {
        app.use(middleware);
    })
}