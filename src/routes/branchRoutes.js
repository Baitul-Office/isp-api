const express = require("express");

const controller = require(
    "../controllers/branchController"
);

const router = express.Router();

/**
 * @swagger
 * /api/branch:
 *   get:
 *     summary: Get all branches
 *     tags: [branch]
 *     responses:
 *       200:
 *         description: A list of branches
 */
router.get("/", controller.getBranches);


/**
 * @swagger
 * /api/branch/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: branch found
 *       404:
 *         description: branch not found
 */

router.get("/:id", controller.getBranch);

router.post("/", controller.createBranch);

module.exports = router;