// sample.js - sample route module.
const express = require("express");
const carbookkeeping = require("../../controller/carbookkeeping");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/payment-tools/list", middleware, carbookkeeping.paymentToolsList);
router.get("/car-status/:carStatus", middleware, carbookkeeping.listByCarStatus);
router.get("/car/:carId", middleware, carbookkeeping.detail);

// POST
router.post("/create", middleware, carbookkeeping.create);
router.patch("/cancel", middleware, carbookkeeping.cancel);

module.exports = router;
