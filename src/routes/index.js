const express = require("express");

const companyRoutes = require("./companyRoutes");
const branchRoutes = require("./branchRoutes");
const authRoutes = require("./authRoutes");
const zoneRoutes = require("./zoneRoutes");

const router = express.Router();

router.use("/branch", branchRoutes);
router.use("/company", companyRoutes);
router.use("/auth", authRoutes);
router.use("/zone", zoneRoutes);

module.exports = router;