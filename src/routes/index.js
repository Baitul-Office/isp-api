const express = require("express");

const companyRoutes = require("./companyRoutes");
const branchRoutes = require("./branchRoutes");

const router = express.Router();

router.use("/branch", branchRoutes);
router.use("/company", companyRoutes);

module.exports = router;