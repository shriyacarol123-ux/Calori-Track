🥗 NutriTrack: Biometric-Driven Nutritional Analysis
Developed by: Shriya Grace Binu (B.Sc. Data Science, Semester II)

📌 Project Overview
NutriTrack is a full-stack health-data ecosystem designed to bridge the gap between daily eating habits and relational data storage. Unlike a basic logger, this system uses Real-Time Feature Engineering to calculate a user's Body Mass Index (BMI) and dynamically prescribes a Nutritional Strategy based on their specific biometric profile.

🚀 Key Data Science Features
Biometric Inference Engine: The application processes raw height and weight data to derive the BMI, a critical health metric for weight management.

Prescriptive Analysis: Using conditional logic, the system classifies the user's health status (Underweight, Healthy weight, Overweight) and suggests a specific dietary path (Surplus vs. Deficit).

Asynchronous Data Pipeline: Built with a Node.js API, the system ensures a "no-refresh" user experience, syncing data instantly from the frontend to the MySQL persistence layer.

Relational Data Integrity: Utilizes MySQL logic to maintain an atomic, cumulative record for each user, preventing data redundancy in the database.

🛠️ Technical Stack
Frontend: HTML5, CSS3 (Bootstrap 5), and JavaScript for real-time calculation and DOM manipulation.

Backend: Node.js & Express framework to manage RESTful API endpoints.

Database: MySQL. Acts as the "Persistent Data Vault" for long-term health tracking.

Visuals: AOS (Animate On Scroll) for professional UI transitions.

📊 Database Schema (MySQL)
The system stores data in a table named meals with the following structure:

user_name (VARCHAR): Unique identifier for the user session.

food_name (VARCHAR): Description of the meal transaction.

calories (INT): Numerical energy value for aggregation.

🏁 Future Scope
Historical Data Visualization: Integrating R-Studio or Chart.js to graph caloric trends over time.

API Integration: Connecting to global food databases for automated calorie fetching.

🛡️ Technical Implementation Details
Data Validation: The system parses input as integers to ensure mathematical accuracy in the database.

API Architecture: Built with a RESTful POST endpoint that returns a JSON payload containing the updated user state.

Error Handling: Includes a comprehensive try-catch block and database connection monitoring to ensure system uptime.
