const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('../lib/db.js');
const pdfParse = require('pdf-parse');
const { responseSchema } = require('../ai_src/path-schema.js');
const { prompt } = require('../ai_src/path-prompt.js');
const { getCourseRequirements } = require('../ai_src/scraped/bulletins/bulletin_maps.js'); // Import the function
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function convertPdfToText(fileBuffer) {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("Error converting PDF to text:", error);
    throw new Error("Failed to convert PDF to text");
  }
}

async function generatePrompt(sessionId) {
  try {
    // Fetch user data
    const user = await db.search('users', 'session_id', sessionId);
    const preferences = await db.search('preferences', 'session_id', sessionId);
    const transcript = await db.search('transcripts', 'session_id', sessionId);

    let transcriptText = '';
    if (transcript && transcript.file) {
      try {
        // Convert the transcript PDF to text
        transcriptText = await convertPdfToText(transcript.file);
        transcriptText = `Transcript: ${transcriptText}`; // Add label
      } catch (error) {
        console.error("Error processing transcript:", error);
        transcriptText = 'Error processing transcript';
      }
    }

    // Fetch course requirements based on user preferences
    let academicRequirements = {
      majors: [],
      minors: []
    };

    if (preferences && preferences.majors && preferences.majors.length > 0) {
      for (const major of preferences.majors) {
        const requirements = getCourseRequirements(major);
        if (requirements) {
          academicRequirements.majors.push({ name: major, requirements });
        } else {
          console.warn(`Requirements for major "${major}" not found.`);
        }
      }
    }

    if (preferences && preferences.minors && preferences.minors.length > 0) {
      for (const minor of preferences.minors) {
        const requirements = getCourseRequirements(minor);
        if (requirements) {
          academicRequirements.minors.push({ name: minor, requirements });
        } else {
          console.warn(`Requirements for minor "${minor}" not found.`);
        }
      }
    }

    // Combine user data into a single string
    const userData = `
      User Name: ${user ? user.name : 'N/A'}
      Preferences: ${preferences ? JSON.stringify(preferences) : 'N/A'}
      ${transcriptText}
      Academic Requirements: ${JSON.stringify(academicRequirements)}
    `;

    // Combine base prompt with user data
    const fullPrompt = `${prompt}\n\nUser Information:\n${userData}`;
    return fullPrompt;

  } catch (error) {
    console.error("Error generating prompt:", error);
    throw new Error("Failed to generate prompt");
  }
}

async function generateRecommendation(sessionId) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro", // Use a more capable model for structured output
    generationConfig: {
      temperature: 0.4, // Lower for structured, logical responses
      topP: 0.8,        // Balanced diversity
      topK: 50,         // Slightly broader token selection
      maxOutputTokens: 10000 // Extended output length
    }
  });

  try {
    const prompt = await generatePrompt(sessionId);

    console.log("Prompt sent to Gemini:", prompt); // Log the prompt

    // Generate content with structured output configuration
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const response = await result.response;
    const text = response.text();

    // The response should already be valid JSON, but we'll parse it to be safe
    let structuredOutput = null;
    try {
      structuredOutput = JSON.parse(text);
      console.log("Parsed structured output:", structuredOutput); // Log the structured output
    } catch (parseError) {
      console.warn("Failed to parse response as JSON. Returning raw text.", parseError);
      structuredOutput = { rawText: text }; // Store raw text if parsing fails
    }

    return structuredOutput;
  } catch (error) {
    console.error("Error generating recommendation:", error);
    throw error; // Re-throw for the route handler to catch
  }
}

/**
 * @swagger
 * /path:
 *   get:
 *     summary: Retrieve a recommended 4-year college path using the Gemini API
 *     tags: [College Path]
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
 *                 recommendation:
 *                   type: string
 *                   description: A 4-year college path as generated by the Gemini API
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const sessionId = req.header('session-id');

    if (!sessionId) {
      return res.status(401).json({ error: 'Unauthorized: Missing session ID' });
    }

    const recommendation = await generateRecommendation(sessionId);
        // Generate a unique ID for the path
        const pathId = uuidv4();

        // Determine flags based on major/minor mapping success
        let flags = null;
        // TODO: Implement logic to check if major/minor mapping was successful
        // Example:
        // if (!majorMappingSuccessful || !minorMappingSuccessful) {
        //     flags = "Warning: Information may be inaccurate due to missing major/minor data.";
        // }

        // Store the recommendation in the database
        const insertResult = await db.insert(
            'paths',
            ['id', 'session_id', 'response', 'flags'],
            [pathId, sessionId, JSON.stringify(recommendation), flags]
        );

        if (insertResult.result === 'error') {
            console.error("Error inserting path:", insertResult.type);
            return res.status(500).json({ error: 'Failed to save recommendation', details: insertResult.type });
        }

        res.status(200).json({ path_id: pathId, recommendation: recommendation });


  } catch (error) {
    console.error("Error generating recommendation:", error);
    res.status(500).json({ error: 'Failed to generate recommendation', details: error.message });
  }
});

/**
 * @swagger
 * /path/session:
 *   get:
 *     summary: Retrieve all path IDs and creation times for a given session ID from header
 *     tags: [College Path]
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID to filter paths
 *     responses:
 *       200:
 *         description: A list of path IDs and creation times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The path ID
 *                   created:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the path
 *       500:
 *         description: Internal server error
 */
router.get('/session', async (req, res) => {
  try {
      const sessionId = req.header('session-id');

      if (!sessionId) {
          return res.status(400).json({ error: 'Session ID missing in header' });
      }

      const query = 'SELECT id, created FROM `paths` WHERE `session_id` = ?';
      const results = await db.executeQuery(query, [sessionId]);

      res.status(200).json(results);
  } catch (error) {
      console.error("Error retrieving paths:", error);
      res.status(500).json({ error: 'Failed to retrieve paths', details: error.message });
  }
});

/**
 * @swagger
 * /path/{pathId}:
 *   get:
 *     summary: Retrieve the response for a given path ID
 *     tags: [College Path]
 *     parameters:
 *       - in: path
 *         name: pathId
 *         required: true
 *         schema:
 *           type: string
 *         description: The path ID to retrieve
 *     responses:
 *       200:
 *         description: The response for the given path ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The JSON response from the Gemini API
 *       404:
 *         description: Path not found
 *       500:
 *         description: Internal server error
 */
router.get('/:pathId', async (req, res) => {
    try {
        const pathId = req.params.pathId;
        const path = await db.search('paths', 'id', pathId);

        if (!path) {
            return res.status(404).json({ error: 'Path not found' });
        }

        // Parse the JSON string back into an object
        const response = path.response;
        res.status(200).json({ response: response });

    } catch (error) {
        console.error("Error retrieving path:", error);
        res.status(500).json({ error: 'Failed to retrieve path', details: error.message });
    }
});

module.exports = router;
