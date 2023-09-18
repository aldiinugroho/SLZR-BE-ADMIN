// sample.js - sample route module.
const express = require("express");
const sample = require("../../controller/sample");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/", sample.base);
router.get("/check-middleware", middleware, sample.base);

module.exports = router;
