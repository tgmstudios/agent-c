const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     SessionIdAuth:
 *       type: apiKey
 *       in: header
 *       name: session-id
 * 
 * /schedule:
 *   get:
 *     summary: Get the recommended current semester schedule
 *     security:
 *       - SessionIdAuth: []
 *     responses:
 *       200:
 *         description: The current semester schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 semester:
 *                   type: string
 *                   example: "Fall 2023"
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: "Introduction to Programming"
 *                       time:
 *                         type: string
 *                         example: "10:00 AM - 11:30 AM"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No session ID provided"
 */

const authenticate = (req, res, next) => {
  const sessionId = req.headers['session-id'];
  if (!sessionId) {
    return res.status(401).json({ error: 'Unauthorized: No session ID provided' });
  }

  // Mock authentication logic
  if (sessionId === 'valid-session-id') {
    req.user = { id: 1, name: 'John Doe' }; // Mock user data
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized: Invalid session ID' });
  }
};

router.use(authenticate);

router.get('/', (req, res) => {
  const currentSemesterSchedule = {
    semester: 'Fall 2023',
    courses: [
      { id: 101, name: 'Introduction to Programming', time: '10:00 AM - 11:30 AM' },
      { id: 102, name: 'Data Structures', time: '1:00 PM - 2:30 PM' },
    ],
  };

  res.json(currentSemesterSchedule);
});

module.exports = router;
