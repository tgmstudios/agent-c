const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../lib/db.js'); // Import database functions

/**
 * @swagger
 * /user/transcript:
 *   post:
 *     summary: Upload a transcript PDF
 *     tags: [Transcripts]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for authentication
 *       - in: formData
 *         name: transcript
 *         required: true
 *         type: file
 *         description: The transcript PDF file to upload
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               transcript:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *                   properties:
 *                     originalname:
 *                       type: string
 *                       description: Original name of the uploaded file
 *                     mimetype:
 *                       type: string
 *                       description: Mimetype of the uploaded file
 *                     size:
 *                       type: integer
 *                       description: Size of the uploaded file in bytes
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// Configure Multer for file storage
const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage: storage });

// Route to handle transcript PDF upload
router.post('/', upload.single('transcript'), async (req, res) => {
    const sessionId = req.header('session-id');

    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized: Missing session ID' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Check if session ID exists
        const sessionExists = await db.searchExists('sessions', 'id', sessionId);
        if (!sessionExists) {
            return res.status(401).json({ error: 'Unauthorized: Invalid session ID' });
        }

        // Insert the transcript data into the database
        const result = await db.insert(
            'transcripts',
            ['session_id', 'file'],
            [sessionId, req.file.buffer]
        );

        if (result.result === 'success') {
            return res.status(200).json({ message: 'File uploaded successfully', file: {
              originalname: req.file.originalname,
              mimetype: req.file.mimetype,
              size: req.file.size
            } });
        } else {
            console.error("Failed to insert transcript:", result.type);
            return res.status(500).json({ error: 'Failed to upload file', details: result.type });
        }
    } catch (error) {
        console.error("Error handling transcript upload:", error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
