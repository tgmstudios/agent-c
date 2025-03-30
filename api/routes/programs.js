const express = require('express');
const router = express.Router();
const fs = require('fs');

// Load the JSON data from the file
let collegeData = {};
try {
    const data = fs.readFileSync('ai_src/scraped/lionpath/majors-minors.json', 'utf8');
    collegeData = JSON.parse(data);
} catch (err) {
    console.error("Error reading or parsing the JSON file:", err);
}

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Operations related to college majors and minors
 */

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Lists all colleges
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: A list of college names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/', (req, res) => {
    try {
        const colleges = Object.keys(collegeData);
        res.status(200).json(colleges);
    } catch (error) {
        console.error("Error listing colleges:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /programs/{collegeName}:
 *   get:
 *     summary: Lists majors and minors for a specific college
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: collegeName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the college
 *     responses:
 *       200:
 *         description: Majors and minors for the specified college
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 majors:
 *                   type: array
 *                   items:
 *                     type: string
 *                 minors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: College not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the college was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the failure
 */
router.get('/:collegeName', (req, res) => {
    try {
        const collegeName = req.params.collegeName;
        const collegeDetails = collegeData[collegeName];

        if (!collegeDetails) {
            return res.status(404).json({ error: 'College not found' });
        }

        const majors = collegeDetails.major ? collegeDetails.major.map(major => major.label) : [];
        const minors = collegeDetails.minor ? collegeDetails.minor.map(minor => minor.label) : [];

        res.status(200).json({ majors: majors, minors: minors });
    } catch (error) {
        console.error("Error listing majors and minors:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
