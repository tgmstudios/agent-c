const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

/**
 * @swagger
 * /user/transcript:
 *   post:
 *     summary: Upload a transcript PDF
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
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware to check session ID for authentication
const authenticateSession = (req, res, next) => {
  const sessionId = req.headers['session-id'];
  if (!sessionId || sessionId !== 'valid-session-id') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Route to handle transcript PDF upload
router.post('/upload', authenticateSession, upload.single('transcript'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
