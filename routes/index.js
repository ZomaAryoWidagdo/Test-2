"use strict";
const router = require("express").Router();
const users = require("./Users");
const food = require("./Food");
const orders = require("./Orders");

const errorHandler = require("../middlewares/errorHandler");

router.use("/users", users);
router.use("/food", food);
router.use("/orders", orders);

router.use(errorHandler);

module.exports = router;
