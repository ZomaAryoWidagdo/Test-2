"use strict";
const router = require("express").Router();
const OrderController = require("../controllers/Orders");
const { authentication } = require("../middlewares/authentication");

router.use(authentication);

router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.post("/add", OrderController.add);
router.patch("/:id", OrderController.updateQuantity);
router.patch("/:id/paid", OrderController.updateStatus);
router.delete("/:id", OrderController.deleteFood);
router.delete("/:id/delete", OrderController.deleteOrder);

module.exports = router;
