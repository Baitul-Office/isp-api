const express = require("express");

const companyRoutes = require("./companyRoutes");
const branchRoutes = require("./branchRoutes");
const authRoutes = require("./authRoutes");
const zoneRoutes = require("./zoneRoutes");
const subzoneRoutes = require("./subzoneRoutes");
const boxRoutes = require("./boxRoutes");
const popRoutes = require("./popRoutes");

const router = express.Router();

router.use("/branch", branchRoutes);
router.use("/company", companyRoutes);
router.use("/auth", authRoutes);
router.use("/zone", zoneRoutes);
router.use("/subzone", subzoneRoutes);
router.use("/box", boxRoutes);
router.use("/pop", popRoutes);

module.exports = router;