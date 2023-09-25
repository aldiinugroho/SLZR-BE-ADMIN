// sample.js - sample route module.
const express = require("express");
const carbookkeeping = require("../../controller/carbookkeeping");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/payment-tools/list", middleware, carbookkeeping.paymentToolsList);

module.exports = router;
