// sample.js - sample route module.
const express = require("express");
const auth = require("../../controller/auth");
const router = express.Router();
const { mastermiddleware } = require('../../middleware');

// GET
router.get("/", auth.base);

// POST
router.post("/login", auth.login);
router.post("/create", mastermiddleware, auth.create);

module.exports = router;