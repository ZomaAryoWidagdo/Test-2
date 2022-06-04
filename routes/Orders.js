"use strict";
const router = require("express").Router();
const OrderController = require("../controllers/Orders");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

router.use(authentication);

router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.post("/add", OrderController.add);
router.patch("/:id", OrderController.updateQuantity);
router.patch("/:id/paid", authorization, OrderController.updateStatus);
router.delete("/:id", OrderController.deleteFood);
router.delete("/:id/delete", OrderController.deleteOrder);

module.exports = router;
