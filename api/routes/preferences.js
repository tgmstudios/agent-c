const express = require('express');
const router = express.Router();
const db = require('../lib/db.js'); // Import database functions

/**
 * @swagger
 * /user/preferences:
 *   put:
 *     summary: Update or create user preferences
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classTimes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Preferred class times (e.g., "morning", "afternoon")
 *               delivery:
 *                 type: string
 *                 enum: [online, inperson]
 *                 description: Preferred mode of learning
 *               majors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of preferred majors
 *               minors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of preferred minors
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       201:
 *         description: Preferences created successfully
 *       400:
 *         description: Bad request - Invalid input or missing session ID
 */
router.put('/', async (req, res) => {
    const sessionId = req.header('session-id');
    const { classTimes, delivery, majors, minors } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Bad request: Missing session ID in header' });
    }

    try {
        // Check if preferences already exist for the given session_id
        const existingPreferences = await db.search('preferences', 'session_id', sessionId);

        if (existingPreferences) {
            // Update individual preferences based on the provided fields in the request body

            if (classTimes !== undefined) {
                await db.update('preferences', 'classTimes', JSON.stringify(classTimes), 'session_id', sessionId);
            }
            if (delivery !== undefined) {
                await db.update('preferences', 'delivery', JSON.stringify(delivery), 'session_id', sessionId);
            }
            if (majors !== undefined) {
                await db.update('preferences', 'majors', JSON.stringify(majors), 'session_id', sessionId);
            }
            if (minors !== undefined) {
                await db.update('preferences', 'minors', JSON.stringify(minors), 'session_id', sessionId);
            }

            return res.status(200).json({ message: 'Preferences updated successfully' });
        } else {
            // Insert new preferences into the database

            const result = await db.insert(
                'preferences',
                ['session_id', 'classTimes', 'delivery', 'majors', 'minors'],
                [
                    sessionId,
                    classTimes ? JSON.stringify(classTimes) : null,
                    delivery ? JSON.stringify(delivery) : null,
                    majors ? JSON.stringify(majors) : null,
                    minors ? JSON.stringify(minors) : null,
                ]
            );

            if (result.result === 'success') {
                return res.status(201).json({ message: 'Preferences created successfully' });
            } else {
                return res.status(500).json({ error: 'Failed to create preferences', details: result.type });
            }
        }
    } catch (error) {
        console.error("Error handling preferences:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /user/preferences/{preferenceName}:
 *   get:
 *     summary: Retrieve a specific preference by session ID
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for authentication
 *       - in: path
 *         name: preferenceName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [classTimes, delivery, majors, minors]
 *         description: The name of the preference to retrieve
 *     responses:
 *       200:
 *         description: Preference retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preferenceName:
 *                   type: string
 *                   description: The name of the requested preference
 *                 value:
 *                   type: string
 *                   description: The value of the requested preference
 *       401:
 *         description: Unauthorized - Missing or invalid session ID
 *       404:
 *         description: Not Found - Preference does not exist
 */
router.get('/preferences/:preferenceName', async (req, res) => {
  const sessionId = req.header('session-id');
  const { preferenceName } = req.params;

  // Validate session ID and preference name
  if (!sessionId) {
      return res.status(401).json({ error: 'Unauthorized - Missing session ID' });
  }

  const validPreferences = ['classTimes', 'delivery', 'majors', 'minors'];
  if (!validPreferences.includes(preferenceName)) {
      return res.status(400).json({ error: `Bad request - Invalid preference name. Valid options are ${validPreferences.join(', ')}` });
  }

  try {
      // Fetch the user's preferences based on the session ID
      const userPreferences = await search('preferences', 'session_id', sessionId);

      if (!userPreferences || userPreferences[preferenceName] === undefined) {
          return res.status(404).json({ error: `Not Found - Preference '${preferenceName}' does not exist` });
      }

      // Return the requested preference value
      res.status(200).json({
          preferenceName,
          value: JSON.parse(userPreferences[preferenceName]) // Parse JSON if stored as JSON in DB
      });
  } catch (error) {
      console.error("Error retrieving preference:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
