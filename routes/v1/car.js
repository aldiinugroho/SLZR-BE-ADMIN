// sample.js - sample route module.
const express = require("express");
const car = require("../../controller/car");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/list", middleware, car.list);

// POST
router.post("/create", middleware, car.create);

module.exports = router;
