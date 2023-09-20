// sample.js - sample route module.
const express = require("express");
const upload = require("../../controller/upload");
const router = express.Router();
const { mastermiddleware } = require('../../middleware');
const multer = require('multer');
const uploadWithMulter = multer();

router.post("/create", uploadWithMulter.single('file'), upload.create);

module.exports = router;