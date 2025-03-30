const express = require('express');
const router = express.Router();
const db = require('../lib/db.js'); // Import database functions

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to user management
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a user's name by session ID
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User name retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *       401:
 *         description: Unauthorized - Missing session ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    const sessionId = req.header('session-id');

    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized: Missing session ID' });
    }

    try {
        // Fetch user by session ID from the database
        const user = await db.search('users', 'session_id', sessionId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ id: user.id, name: user.name });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         description: Session ID for the new user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 session_id:
 *                   type: string
 *                   description: The session ID of the created user
 *                 name:
 *                   type: string
 *                   description: The name of the created user
 *       400:
 *         description: Bad request - Missing session ID or user name
 *       500:
 *         description: Internal server error
 */
router.put('/', async (req, res) => {
    const sessionId = req.header('session-id');
    const { name } = req.body;
  
    if (!sessionId) {
      return res.status(400).json({ error: 'Bad request: Missing session ID in header' });
    }
  
    if (!name) {
      return res.status(400).json({ error: 'Bad request: Missing user name' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await db.search('users', 'session_id', sessionId);
      
      if (existingUser) {
        // User exists, update instead of insert
        const updateResult = await db.update('users', 'name', name, 'session_id', sessionId);
        return res.status(200).json({ 
          message: 'User updated successfully', 
          session_id: sessionId, 
          name 
        });
      }
      
      // Insert new user if not exists
      const result = await db.insert('users', ['session_id', 'name'], [sessionId, name]);
  
      if (result.result === 'success') {
        return res.status(201).json({ message: 'User created successfully', session_id: sessionId, name });
      } else {
        return res.status(500).json({ error: 'Failed to create user', details: result.type });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
