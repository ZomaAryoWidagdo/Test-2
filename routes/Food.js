"use strict";
const router = require("express").Router();
const FoodController = require("../controllers/Food");
const { authentication } = require("../middlewares/authentication");

router.use(authentication);

router.get("/", FoodController.getAll);
router.get("/:id", FoodController.getById);
router.post("/add", FoodController.add);
router.patch("/:id", FoodController.update);
router.delete("/:id", FoodController.delete);

module.exports = router;
