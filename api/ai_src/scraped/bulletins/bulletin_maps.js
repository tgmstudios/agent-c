const courseRequirements = {
    // Majors
    "Comp Sci - Univ Park (BS)": () => require('./cmpsc_bs.json'),
    "Computer Engineering (BS)": () => require('./cmpen_bs.json'),
    "Electrical Engr (BS)": () => require('./ee_bs.json'),
    "Data Sciences (BS)": () => require('./dtsce_bs.json'),
    "Entrprs Tech Integration (BS)": () => require('./etchi_bs.json'),
    "Cybersec Analyt and Oper (BS)": () => require('./cyaop_bs.json'),
    "Security & Rsk Analy (BS)": () => require('./sra_bs.json'),

    
    // Minors
    "Computational Sciences (UMNR)": () => require('./cptsc_umnr.json'),
    "Cybrsc Comput Fndations (UMNR)": () => require('./ccf_umnr.json'),
    "IST for Arospace Eng (UMNR)": () => require('./isasp_umnr.json'),
    "IST for Indstrl Engr (UMNR)": () => require('./istie_umnr.json'),
    "Security & Rsk Analy (UMNR)": () => require('./sra_umnr.json'),
    "Mathematics (UMNR)": () => require('./math_umnr.json')
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
  