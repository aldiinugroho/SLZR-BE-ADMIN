// sample.js - sample route module.
const express = require("express");
const car = require("../../controller/car");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/list", middleware, car.list);
router.get("/:carId", middleware, car.detail);

// POST
router.post("/create", middleware, car.create);

// DELETE
router.delete("/:carId", middleware, car.delete);

module.exports = router;
