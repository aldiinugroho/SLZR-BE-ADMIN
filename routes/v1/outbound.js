// sample.js - sample route module.
const express = require("express");
const outbound = require("../../controller/outbound");
const router = express.Router();
const { middleware } = require('../../middleware');

// POST
// MIDTRANS
router.post("/midtrans-payment-notification", outbound.midtransPaymentNotification);

// GET
// LZR AUTO
router.get("/lzrauto/list-car/:offset", middleware, outbound.listCar);
router.get("/lzrauto/detail-car/:carId", middleware, outbound.detailCar);

module.exports = router;
