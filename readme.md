# CourseConnect: Streamlining Academic Planning at Penn State

CourseConnect is a comprehensive platform designed to revolutionize academic planning for Penn State students by consolidating fragmented course selection processes into one intuitive interface.

## The Problem

Navigating the academic journey at Penn State can be daunting. Students spend countless hours cross-referencing information between the LionPATH interface, RateMyProfessor reviews, University Bulletins, and recommended major pathways. This fragmented process is time-consuming, stressful, and often leads to poor course selections, potentially impacting GPA, graduation timelines, and overall college experience. Currently, there's no unified, intelligent solution to simplify course planning and scheduling tailored to individual Penn State students.

## The Solution

CourseConnect streamlines academic planning by providing personalized course recommendations based on a student's actual academic record. By simply uploading their transcript, students receive tailored suggestions incorporating factors like:

- Course difficulty
- Professor ratings (via RateMyProfessor data)
- General Education requirements
- Major/minor progress

The platform presents not just the next semester's schedule but a potential four-year path, empowering students to make informed decisions effortlessly.

## Technology Stack

### Core AI Component
CourseConnect leverages Google's Gemini API for:
- Accurately extracting completed courses, credits, and grades from uploaded PDF transcripts
- Understanding complex degree requirements from scraped Bulletin information and major pathways
- Generating optimal course suggestions considering prerequisites, student preferences, and professor quality metrics

### Backend Infrastructure
- **Data Sources**: Scraped information from Penn State's course scheduler, University Bulletins, and recommended major pathways
- **API Structure**: RESTful API with endpoints for:
  - User session management (`/session`)
  - Transcript upload (`/user/transcript`)
  - Preference setting (`/user/preferences`)
  - User information retrieval (`/user`)
  - Recommended semester schedule (`/schedule`)
  - Full 4-year path planning (`/path`)

### Frontend
A clean, user-friendly web interface built with modern web technologies including HTML5, CSS3, and JavaScript.

## Challenges and Solutions

### Context Window Limitations
**Challenge**: Overestimating Gemini's context window and inability to process all data simultaneously.
**Solution**: Carefully hand-selecting the most important data and providing only what's necessary for each recommendation.

### Data Scraping Complexity
**Challenge**: Maintaining up-to-date information from various Penn State sources despite website changes and anti-scraping measures.
**Solution**: Developing robust scraping scripts with error handling and implementing a flexible database schema to accommodate data variations.

### AI Prompt Engineering
**Challenge**: Creating effective prompts for Gemini to accurately interpret academic transcripts and complex degree rules.
**Solution**: Implementing rigorous testing cycles for prompt variations, focusing on edge cases and ensuring structured output meets application needs.

### Data Integration
**Challenge**: Merging data from transcripts, scraped sources, user preferences, and real-time availability.
**Solution**: Developing clear data flow architecture and robust backend logic to transform diverse inputs into actionable recommendations.

### Feature Prioritization
**Challenge**: Balancing MVP features with the ideal feature set within a hackathon timeline.
**Solution**: Prioritizing core functionality first while building a solid foundation for advanced features.

## Accessibility

CourseConnect is designed with accessibility in mind, adhering to WCAG guidelines for web content including:
- Proper color contrast
- Logical content flow
- Sufficient font sizes
- Keyboard navigability
- Screen reader compatibility

## Key Accomplishments

- Successfully designing the core concept and architecture
- Developing the initial API structure
- Setting up the framework for scraping Penn State academic data
- Integrating Google Gemini API for recommendation logic
- Defining a clear, user-centric onboarding process

## Future Plans

- **Feature Expansion**: Implement direct RateMyProfessor integration, interest-based Gen Ed recommendations, and visual calendar view
- **Algorithm Refinement**: Continuously improve the Gemini-powered recommendation engine
- **Enhanced User Profiles**: Allow preference fine-tuning, visual degree progress tracking, and major/minor scenario exploration
- **UI/UX Polish**: Iterate on the interface for intuitive, efficient user experience
- **Platform Expansion**: Adapt for other universities through modular data source integration
- **Real-time Data**: Explore integration with LionPATH for current course availability

## Technologies Used

The platform is built using a modern tech stack including JavaScript, Python (with BeautifulSoup/Scrapy for data scraping), RESTful API architecture, and cloud infrastructure, with potential implementation of React for the frontend and MongoDB/PostgreSQL for database management.
