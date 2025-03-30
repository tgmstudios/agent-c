const express = require('express');
const router = express.Router();
const { insert } = require('../lib/db.js');
const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Operations related to user sessions
 */

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Generates a new session
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Unique session ID generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session_id:
 *                   type: string
 *                   format: uuid
 *                   description: Unique session ID in the form '8aa5654e-4f00-47eb-ab03-3991abcbd9db'
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
 *                 details:
 *                   type: string
 *                   description: Detailed error information
 */
router.get('/', async (req, res) => {
    try {
        // Generate a new UUID
        const newSessionId = uuidv4();

        // Insert the new session into the database
        const result = await insert('sessions', ['id'], [newSessionId]);

        if (result.result === 'success') {
            res.status(200).json({ session_id: newSessionId });
        } else {
            res.status(500).json({ error: 'Failed to create session', details: result.type });
        }
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
