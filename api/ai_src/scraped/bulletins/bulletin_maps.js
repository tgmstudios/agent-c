const courseRequirements = {
    "Comp Sci - Univ Park (BS)": () => require('./cmpsc_bs.json'),
    // Add other major mappings here as needed
  };
  
  /**
   * Retrieves the JSON object containing course requirements for a given major.
   *
   * @param {string} majorName - The name of the major (e.g., "Comp Sci - Univ Park (BS)").
   * @returns {object|null} The JSON object containing the course requirements, or null if the major is not found.
   */
  exports.getCourseRequirements = (majorName) => {
    const majorLookup = courseRequirements[majorName];
    if (majorLookup) {
      return majorLookup();
    } else {
      console.warn(`Major "${majorName}" not found.`);
      return null;
    }
  };
  