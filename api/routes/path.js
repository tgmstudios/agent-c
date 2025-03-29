const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /path:
 *   get:
 *     summary: Retrieve a recommended 4-year college path
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for authentication
 *     responses:
 *       200:
 *         description: A recommended 4-year college path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year1:
 *                   type: string
 *                   description: Courses for year 1
 *                 year2:
 *                   type: string
 *                   description: Courses for year 2
 *                 year3:
 *                   type: string
 *                   description: Courses for year 3
 *                 year4:
 *                   type: string
 *                   description: Courses for year 4
 */
router.get('/', (req, res) => {
  const recommendation = {
    year1: 'Intro to Programming, Calculus I, English Composition',
    year2: 'Data Structures, Calculus II, Physics I',
    year3: 'Algorithms, Databases, Operating Systems',
    year4: 'Software Engineering, Capstone Project, Electives'
  };
  res.json(recommendation);
});

module.exports = router;
