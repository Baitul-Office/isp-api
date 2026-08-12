const express = require("express");

const controller = require("../controllers/zoneController");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Zone
 *   description: ISP Zone management
 */

/**
 * @swagger
 * /api/zone:
 *   get:
 *     summary: Get all zones
 *     tags: [Zone]
 *     responses:
 *       200:
 *         description: List of zones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Zone'
 *       500:
 *         description: Server error
 */
router.get("/", controller.getZones);

/**
 * @swagger
 * /api/zone/{id}:
 *   get:
 *     summary: Get zone by ID
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Zone ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Zone details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Server error
 */
router.get("/:id", controller.getZoneById);

/**
 * @swagger
 * /api/zone:
 *   post:
 *     summary: Create a new zone
 *     tags: [Zone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateZone'
 *     responses:
 *       201:
 *         description: Zone created successfully
 *       500:
 *         description: Server error
 */
router.post("/", controller.createZone);

/**
 * @swagger
 * /api/zone/{id}:
 *   put:
 *     summary: Update a zone
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Zone ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateZone'
 *     responses:
 *       200:
 *         description: Zone updated successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Server error
 */
router.put("/:id", controller.updateZone);

/**
 * @swagger
 * /api/zone/{id}:
 *   delete:
 *     summary: Delete a zone
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Zone ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Zone deleted successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", controller.deleteZone);


module.exports = router;