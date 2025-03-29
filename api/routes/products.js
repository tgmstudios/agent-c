const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Product A' }]);
});

module.exports = router;
