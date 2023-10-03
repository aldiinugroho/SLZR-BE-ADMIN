// sample.js - sample route module.
const express = require("express");
const outbound = require("../../controller/outbound");
const router = express.Router();
const { middleware } = require('../../middleware');

// POST
router.post("/midtrans-payment-notification", outbound.midtransPaymentNotification);

module.exports = router;
