"use strict";
const router = require("express").Router();
const users = require("./Users");

const errorHandler = require("../middlewares/errorHandler");

router.use("/users", users);

router.use(errorHandler);

module.exports = router;
