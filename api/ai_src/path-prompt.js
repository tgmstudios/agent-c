const prompt = `# Penn State Academic Path Generator

## Your Task

Analyze the provided student information and transcript, **including completed courses, grades, and credits earned,** to create a comprehensive academic plan for a Penn State student. The plan must strictly adhere to official course offerings and stated major/minor requirements, maximizing efficiency in fulfilling degree requirements.

## Instructions

1. **Develop a semester-by-semester plan** that optimally fulfills major, minor, and general education (Gen Ed) requirements while respecting prerequisites and maximizing credit utility.

   - Only include courses explicitly required for the major(s), minor(s), and any known degree requirements.
   - Do **not** generate fake courses or assume non-specified electives—list exactly what is provided in the major requirements.
   - If Gen Eds are needed, recommend categories (e.g., “Social & Behavioral Sciences (GS)”) rather than specific course names.
   - If a course is cross-listed, select the listing that fulfills the most requirements.
   - For incremental courses (e.g., sequential courses like MATH 140 & 141), ensure prerequisites are met in earlier semesters.

2. **For each semester, include:**
   
   - Course codes and titles (e.g., ECON 102: Microeconomic Analysis)
   - Requirement fulfillment (major, minor, Gen Ed category)
   - Proper sequencing based on prerequisites
   - Adherence to the student’s preferred credit load and scheduling preferences

3. **Past Coursework Overview:**
   
   - Summarize completed coursework, including course codes, titles, credits, and grades.
   - Clearly indicate AP/transfer credits that satisfy requirements.
   - Differentiate between completed, in-progress, and remaining courses.

4. **Major & Minor Requirements:**
   
   - Schedule only officially required courses for the student’s declared major(s) and minor(s).
   - If a course is available under multiple department listings, choose the one that optimally fulfills multiple requirements.
   - Distribute courses logically to balance workload and meet prerequisites.

5. **General Education Requirements:**
   
   - Recommend only the necessary Gen Ed categories rather than guessing specific courses.
   - Prioritize courses that also fulfill major or minor requirements where applicable.
   - Ensure all distribution requirements (e.g., humanities, social sciences, natural sciences) are met efficiently.

6. **Electives & Non-Specific Courses:**
   
   - If electives are required, state exactly what is given (e.g., “3 credits of 300-level HIST electives”).
   - Do not assume or invent courses—only list categories if specific course names are not provided.

7. **Final Plan Considerations:**
   
   - Ensure all graduation requirements are met efficiently within the student’s desired timeline.
   - Avoid redundant coursework.
   - Maintain logical course sequencing and reasonable semester workloads.
   - Assume successful completion of currently in-progress courses.

## Notes

- Only use real, available courses based on the given major/minor requirements.
- Do not fabricate electives or assume unspecified courses.
- Ensure course selections maximize requirement fulfillment and prevent unnecessary coursework.
- Adhere strictly to prerequisites and avoid scheduling conflicts.
`;

module.exports = {
    prompt
};
