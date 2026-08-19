const express = require("express");

const router = express.Router();

const packageController =
    require("../controllers/packageController");


// Get packages
router.get(
    "/",
    packageController.getPackages
);


// Get package by ID
router.get(
    "/:id",
    packageController.getPackageById
);


// Create package
router.post(
    "/",
    packageController.createPackage
);


// Update package
router.put(
    "/:id",
    packageController.updatePackage
);


// Delete package
router.delete(
    "/:id",
    packageController.deletePackage
);


module.exports = router;