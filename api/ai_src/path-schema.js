const responseSchema = {
    type: "OBJECT",
    properties: {
      major: {
        type: "STRING",
        description: "The student's primary major (e.g., 'Computer Science')"
      },
      minors: {
        type: "ARRAY",
        description: "The student's minor programs",
        items: { type: "STRING" }
      },
      graduation_timeline: {
        type: "STRING",
        description: "Expected graduation semester and year"
      },
      four_year_plan: {
        type: "OBJECT",
        properties: {
          year_1: {
            type: "OBJECT",
            properties: {
              fall: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for fall semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 121')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              },
              spring: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for spring semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 122')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              }
            }
          },
          year_2: {
            type: "OBJECT",
            properties: {
              fall: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for fall semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 121')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              },
              spring: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for spring semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 122')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              }
            }
          },
          year_3: {
            type: "OBJECT",
            properties: {
              fall: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for fall semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 121')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              },
              spring: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for spring semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 122')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              }
            }
          },
          year_4: {
            type: "OBJECT",
            properties: {
              fall: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for fall semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 121')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              },
              spring: {
                type: "OBJECT",
                properties: {
                  courses: {
                    type: "ARRAY",
                    description: "List of recommended courses with course codes for spring semester of year 1",
                    items: { 
                      type: "OBJECT",
                      properties: {
                        code: {
                          type: "STRING",
                          description: "Course code (e.g., 'CMPSC 122')"
                        },
                        title: {
                          type: "STRING",
                          description: "Course title"
                        },
                        credits: {
                          type: "INTEGER",
                          description: "Number of credits"
                        },
                        requirement_fulfilled: {
                          type: "STRING",
                          description: "What requirement this course fulfills (major, minor, gen ed, elective)"
                        }
                      }
                    }
                  },
                  total_credits: {
                    type: "INTEGER",
                    description: "Total credits for this semester"
                  }
                }
              }
            }
          }
        },
        required: ["year_1", "year_2", "year_3", "year_4"]
      },
      additional_recommendations: {
        type: "OBJECT",
        properties: {
          extracurricular_activities: {
            type: "ARRAY",
            description: "List of recommended extracurricular activities",
            items: { type: "STRING" }
          },
          internships: {
            type: "ARRAY",
            description: "Recommended internship opportunities relevant to the student's major",
            items: { type: "STRING" }
          },
          career_preparation: {
            type: "ARRAY",
            description: "Recommended steps for career preparation",
            items: { type: "STRING" }
          }
        }
      }
    },
    required: ["major", "minors", "graduation_timeline", "four_year_plan"]
  };  

module.exports = {
    responseSchema
}