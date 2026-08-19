const express = require("express");

const router = express.Router();

const oltController = require("../controllers/oltController");


// Get all OLTs
router.get("/", oltController.getAll);


// Get OLT by ID
router.get("/:id", oltController.getById);


// Create OLT
router.post("/", oltController.create);


// Update OLT
router.put("/:id", oltController.update);


// Delete OLT
router.delete("/:id", oltController.remove);


module.exports = router;