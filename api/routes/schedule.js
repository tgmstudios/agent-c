const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('../lib/db.js'); 
const { responseSchema } = require('../ai_src/schedule-schema.js');
const { prompt } = require('../ai_src/schedule-prompt.js');

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Generate a semester schedule based on user preferences and path data
 *     tags: [Schedule]
 *     parameters:
 *       - in: header
 *         name: session-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID of the user
 *       - in: query
 *         name: path_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The path ID to extract courses from
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year for the schedule (e.g., 1)
 *       - in: query
 *         name: semester
 *         required: true
 *         schema:
 *           type: string
 *         description: The semester for the schedule (e.g., "fall", "spring")
 *     responses:
 *       200:
 *         description: The generated semester schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedule_id:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 semester:
 *                   type: string
 *                   example: "Fall 2024"
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "CS101"
 *                       name:
 *                         type: string
 *                         example: "Introduction to Programming"
 *                       credits:
 *                         type: integer
 *                         example: 3
 *       400:
 *         description: Bad Request (missing parameters, invalid input)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Path not found
 *       500:
 *         description: Internal Server Error
 */

async function getSemesterCourses(sessionId, pathId, year, semester) {
  try {
    // 1. Retrieve user data
    const user = await db.search('users', 'session_id', sessionId);
    if (!user) {
      throw new Error("User not found");
    }
    const preferences = await db.search('preferences', 'session_id', sessionId);

    // 2. Retrieve path data
    const path = await db.search('paths', 'id', pathId);
    if (!path) {
      throw new Error("Path not found");
    }

    // 3. Parse the path response
    let pathData;
    try {
      pathData = path.response;
    } catch (error) {
      console.error("Error parsing path data:", error);
      throw new Error("Invalid path data format");
    }

    // 4. Extract courses for the specified semester and year
    const targetSemester = `${semester} ${year}`;
    let semesterCourses = [];

    // Navigate through the path data structure to find the matching semester
    if (pathData.four_year_plan) {
      // The data is organized by year_1, year_2, etc., not as an array
      const yearKey = `year_${year}`;
      
      if (pathData.four_year_plan[yearKey]) {
        // Each year has fall and spring semesters directly as properties
        const semesterData = pathData.four_year_plan[yearKey][semester.toLowerCase()];
        
        if (semesterData && Array.isArray(semesterData.courses)) {
          semesterCourses = semesterData.courses;
        }
      }
    }


    return {
      semester: targetSemester,
      user: user,
      preferences: preferences,
      courses: semesterCourses
    };
  } catch (error) {
    console.error("Error generating schedule:", error);
    throw error;
  }
}

async function generateSchedule(courses) {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", // Use a more capable model for structured output
      generationConfig: {
        temperature: 1, // Lower for structured, logical responses
        topP: 0.8,        // Balanced diversity
        topK: 50,         // Slightly broader token selection
        maxOutputTokens: 10000 // Extended output length
      }
    });

    try {
        const fullPrompt = prompt + JSON.stringify(courses);

        console.log("Prompt sent to Gemini:", fullPrompt); // Log the prompt

        // Generate content with structured output configuration
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
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

router.get('/', async (req, res) => {
    const { path_id, year, semester } = req.query;
    const sessionId = req.headers['session-id'];

    // DEVELOPMENT REMOVE
    //return res.json(require('../ai_src/scraped/weekly-schedule-test.json'));

    // Validate the parameters
    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized: No session ID provided' });
    }

    if (!path_id || !year || !semester) {
        return res.status(400).json({ error: 'Missing path_id, year, or semester' });
    }

    try {
        const courses = await getSemesterCourses(sessionId, path_id, year, semester);
        if (!courses) {
            return res.status(404).json({ error: 'Path not found' });
        }

        const generatedSchedule = await generateSchedule(courses);
        if (!generatedSchedule) {
            return res.status(500).json({ error: 'Failed to generate schedule' });
        }
        
        res.json({
            semester: courses.semester,
            schedule: generatedSchedule
        });
    } catch (error) {
        console.error("Error generating schedule:", error);
        
        if (error.message === "Path not found") {
            return res.status(404).json({ error: 'Path not found' });
        }
        
        res.status(500).json({ error: 'Failed to generate schedule', details: error.message });
    }
});

module.exports = router;
