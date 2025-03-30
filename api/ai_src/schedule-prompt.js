const prompt = `# Penn State Semester Schedule Generator

## Your Task

Using the provided course list, student preferences, and available campus buildings, generate a **realistic** semester schedule for the user.

The schedule must:
- Adhere to the student's **stated time preferences**.
- Be **in-person only**, selecting from real University Park buildings.
- Maintain a credit load within the **student’s preferred range**.
- Ensure courses do not overlap and are scheduled in a **logical, balanced** manner.
- Assign each course a **fake professor** with a generated name and a Rate My Professor (RMP) rating.

## Instructions

1. **Assign Class Times & Days**
   - Ensure class times align with the student's stated preferences.
   - Distribute courses across weekdays appropriately.
   - Avoid scheduling conflicts.

2. **Select Real Penn State University Park Locations**
   - Choose from the following buildings commonly used for Computer Science, Engineering, and General Education courses:
     - **Westgate Building (WGB)**
     - **Thomas Building (THOM)**
     - **Hammond Building (HMB)**
     - **Willard Building (WILL)**
     - **IST Building (IST)**
     - **Sackett Building (SACK)**
     - **Osmond Laboratory (OSM)**
     - **Boucke Building (BOU)**
     - **Schwab Auditorium (SCHW)**
     - **Deike Building (DEIKE)**
     - **Walker Building (WALK)**
     - **Reber Building (REBER)**
     - **Forum Building (FORUM)**
     - **Carnegie Building (CARNE)**
     - **Life Sciences Building (LSB)**
     - **Whitmore Laboratory (WHIT)**
     - **Mueller Laboratory (MUELL)**
   - Prioritize locations typically used for Computer Science and Engineering courses, but allow flexibility for supporting courses.

4. **When provided with a non-exact course value, generate a class that would make sense for that year and semester, adherent to the recommended gen ed or elective type. **
   - For example, if a student is a **first-year** student and requests a **general education** course, suggest a **first-year level course** from the list.
   - If a student is a **third-year** student and requests a **general education** course, suggest a **third-year level course** from the list.
   - Ensure the course level aligns with the student's academic standing.
   
3. **Generate Fake Professors & Ratings**
   - Create unique professor names (e.g., "Dr. Emily Carter", "Prof. Jonathan Wells").
   - Assign an RMP rating between **2.5 and 5.0**, with a short description (e.g., "Great lecturer, but tough grader").
   - Ensure variability in ratings and teaching styles.
`

module.exports = {
   prompt
};
