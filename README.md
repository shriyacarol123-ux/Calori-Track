🥗 CaloriTrack: Real-Time Calorie Intelligence
NutriTrack is a specialized health-data interface built to provide instant feedback on caloric intake. By connecting a responsive frontend to a MySQL persistence layer, it ensures that your daily energy tracking is accurate and stored securely.

🎯 Project Focus: The Calorie Speedometer
Unlike complex apps that track every micro-detail, NutriTrack focuses on the most critical metric for health management: The Daily Calorie Total. It is designed for users who need a fast, "no-friction" way to log meals and see their updated status immediately.

💡 Core Features (As Implemented)
Instant State Synchronization: As soon as a meal is logged, the app fetches the new total directly from the database without a page refresh.

MySQL Upsert Logic: The system uses ON DUPLICATE KEY UPDATE to ensure that each user has a single, clean record for their daily total, preventing data fragmentation.

Relational Aggregation: The backend performs a SUM(calories) calculation on the fly, ensuring the frontend always displays the most current data.

🛠️ The Tech Stack
Frontend: HTML5, CSS3 (Bootstrap 5), and JavaScript. Utilizes AOS for a modern, fluid user experience.

Backend: Node.js & Express. Acts as the controller for processing meal data and managing database queries.

Database: MySQL. Handles the storage and mathematical aggregation of user caloric data.

🛡️ Technical Implementation Details
Data Validation: The system parses input as integers to ensure mathematical accuracy in the database.

API Architecture: Built with a RESTful POST endpoint that returns a JSON payload containing the updated user state.

Error Handling: Includes a comprehensive try-catch block and database connection monitoring to ensure system uptime.
