// sample.js - sample route module.
const express = require("express");
const showroom = require("../../controller/showroom");
const router = express.Router();
const { middleware } = require('../../middleware');

// GET
router.get("/list", middleware, showroom.list);
router.get("/:showroomId", middleware, showroom.detail);
router.post("/create", middleware, showroom.create);
router.patch("/update", middleware, showroom.update);
router.delete("/:showroomId", middleware, showroom.delete);

module.exports = router;
