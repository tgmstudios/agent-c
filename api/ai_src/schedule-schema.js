const responseSchema = {
  type: "OBJECT",
  properties: {
      student_name: {
          type: "STRING",
          description: "The full name of the student (e.g., 'Aiden Johnson')"
      },
      major: {
          type: "STRING",
          description: "The student's primary major (e.g., 'Computer Science - Univ Park (BS)')"
      },
      minors: {
          type: "ARRAY",
          description: "The student's minor programs",
          items: { type: "STRING" }
      },
      semester_schedule: {
          type: "OBJECT",
          properties: {
              semester: {
                  type: "STRING",
                  description: "The current semester and year (e.g., 'Fall 2024')"
              },
              total_credits: {
                  type: "INTEGER",
                  description: "Total number of credits taken in this semester"
              },
              courses: {
                  type: "ARRAY",
                  description: "List of enrolled courses for this semester",
                  items: {
                      type: "OBJECT",
                      properties: {
                          code: {
                              type: "STRING",
                              description: "Course code (e.g., 'CMPSC 465')"
                          },
                          title: {
                              type: "STRING",
                              description: "Course title (e.g., 'Data Structures and Algorithms')"
                          },
                          credits: {
                              type: "INTEGER",
                              description: "Number of credits for this course"
                          },
                          requirement_fulfilled: {
                              type: "STRING",
                              description: "What requirement this course fulfills (Major, Minor, Gen Ed, Elective)"
                          },
                          schedule: {
                              type: "OBJECT",
                              properties: {
                                  days: {
                                      type: "ARRAY",
                                      description: "Days of the week when the class is held (e.g., ['Monday', 'Wednesday', 'Friday'])",
                                      items: { type: "STRING" }
                                  },
                                  time: {
                                      type: "STRING",
                                      description: "Class time in 12-hour format (e.g., '10:00 AM - 11:15 AM')"
                                  },
                                  location: {
                                      type: "STRING",
                                      description: "The building and room number (e.g., 'Westgate Building (WGB), Room 210')"
                                  }
                              }
                          },
                          professor: {
                              type: "OBJECT",
                              properties: {
                                  name: {
                                      type: "STRING",
                                      description: "Professor's full name (e.g., 'Dr. Emily Carter')"
                                  },
                                  rating: {
                                      type: "NUMBER",
                                      description: "Rate My Professor rating (e.g., 4.3)"
                                  },
                                  review: {
                                      type: "STRING",
                                      description: "Short review of the professor (e.g., 'Engaging lectures, but exams are tricky.')"
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  },
  required: ["student_name", "major", "minors", "semester_schedule"]
};

module.exports = {
  responseSchema
};
