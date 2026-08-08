const express = require("express");

const companyRoutes = require("./companyRoutes");
const branchRoutes = require("./branchRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/branch", branchRoutes);
router.use("/company", companyRoutes);
router.use("/auth", authRoutes);

module.exports = router;