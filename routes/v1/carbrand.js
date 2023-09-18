// sample.js - sample route module.
const express = require("express");
const carBrand = require("../../controller/carbrand");
const router = express.Router();
const { mastermiddleware, middleware } = require('../../middleware');

// GET
router.get("/list", middleware, carBrand.list);

// POST
router.post("/create", mastermiddleware, carBrand.create);

module.exports = router;