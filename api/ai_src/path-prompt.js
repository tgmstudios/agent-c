const prompt = `# Penn State Academic Path Generator

## Your Task

Analyze the provided student information and transcript, **including completed courses, grades, and credits earned,** to create a comprehensive academic plan for a Penn State student. Focus on courses that fulfill requirements for their stated major(s) and minor(s), while respecting their preferences and building upon their existing academic record. **Ensure the plan reflects their current standing (including in-progress courses) and avoids unnecessary repetition of completed coursework.**

## Instructions

1. **Develop a semester-by-semester plan** covering the student’s remaining academic journey. The plan should begin with the next upcoming semester based on transcript data, incorporating courses currently in progress.
   
   - Avoid redundancy by ensuring that courses already completed or credited via AP/transfer do not reappear in the schedule.
   - Align the schedule with typical course offerings for each semester (i.e., Fall vs. Spring availability).
   - Maintain the student’s preferred credit load.

2. **For each semester, ensure the schedule includes:**

   - Specific course codes and titles (e.g., ECON 102: Microeconomic Analysis)
   - Major, minor, and general education requirement fulfillment
   - Correct course sequencing and prerequisites
   - The student’s preferred class times and delivery methods (as indicated in their profile)

3. **Past Coursework Overview:**
   - Display a summary of the student’s completed coursework, including course codes, titles, attempted and earned credits, and grades.
   - Highlight any AP or transfer credits that fulfill requirements.
   - Provide a clear distinction between completed, in-progress, and remaining courses.

4. **Major Requirements:**
   - Include core courses required for the declared major.
   - Ensure all supporting courses (such as math or science prerequisites) are scheduled unless already completed.
   - Balance theoretical courses with practical applications.

5. **Minor or Certificate Requirements (if applicable):**
   - Schedule necessary courses based on availability.
   - Consider elective options that align with the student’s career goals.

6. **General Education Recommendations:**
   - Suggest general education courses that also fulfill major or minor requirements where possible.
   - Align selections with the student’s interests and preferred learning style.
   - Ensure distribution requirements (e.g., humanities, social sciences, natural sciences) are met efficiently.

7. **Extracurricular Recommendations:**
   - Suggest 2-3 extracurricular activities per semester that enhance resume and technical skills.
   - Consider clubs, research opportunities, or industry certifications.
   - Provide networking opportunities and professional development.

8. **Final Plan Considerations:**
   - Ensure all graduation requirements are met within the desired timeline.
   - Distribute difficult courses to prevent overwhelming workloads.
   - Adhere to prerequisites and logical course progressions.
   - Keep within the preferred credit range per semester.
   - Assume successful completion of currently in-progress courses.

## Notes

- Ensure that each course aligns with Penn State’s actual course offerings and fulfills the student's degree requirements.
- Avoid redundant courses already credited through AP or transfer.
- Provide realistic and balanced scheduling based on prerequisites and student preferences.
- The projected class plan should be accurate according to information from the student’s transcript and profile.
`

module.exports = {
    prompt
}