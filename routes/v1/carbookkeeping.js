// sample.js - sample route module.
const express = require("express");
const carbookkeeping = require("../../controller/carbookkeeping");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/payment-tools/list", middleware, carbookkeeping.paymentToolsList);
router.get("/car-status/:carStatus", middleware, carbookkeeping.listByCarStatus);
router.get("/car-status/booked/on-progress/:carBuyFromId", middleware, carbookkeeping.listByCarStatusOnlyOnProgress);
router.get("/car/:carId", middleware, carbookkeeping.detail);
router.get("/:carBookKeepingId", middleware, carbookkeeping.carBookKeepingDetail);

// POST
router.post("/create", middleware, carbookkeeping.create);

// PATCH
router.patch("/cancel", middleware, carbookkeeping.cancel);
router.patch("/update-web", middleware, carbookkeeping.updateWeb);

module.exports = router;
