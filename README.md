## Social Media Application
Social Media Platform is a comprehensive application designed to provide users with a social networking experience. The platform allows users to create profiles, connect with friends, share posts, and interact with each other through features such as comments, likes, follows, messaging, and notifications.

## Technologies Used
```
React.js
Express.js
Node.js
MSSQL
Socket.io
```
Features
User Profiles: Users can create personalized profiles with relevant information such as profile pictures, bios, and contact details.
Posts: Users can create, publish, and share posts containing various types of content such as text and images.
Comments: Users can comment on posts to express their opinions, engage in discussions, and provide feedback.
Likes: Users can like posts to show appreciation and support for content created by others.
Follows: Users can follow other users to receive updates on their activities, posts, and interactions.
Messaging: Users can send private messages to other users for direct communication and conversation.
Notifications: Users receive notifications for activities such as new followers, likes, comments, and messages.
Wireframe / Figma Design
Please refer to the provided wireframes or Figma design for a visual representation of the different pages and user interfaces that will be implemented in the application. These designs will help you visualize the overall structure and design of the website.

Frontend
Project Structure Requirements
Protect all routes using React-Router-Dom and authentication.
Use a state management tool like React Context (with reducers) or Redux.
Structure your code using pages and relevant reusable components for better code organization and maintainability.
Add validation to all inputs in forms.
Implement a responsive user interface.
Functional Requirements
User Authentication: Implement a secure user authentication system to ensure that only authorized users can access and interact with the social media platform.
Profile Management: Users can create, edit, and customize their profiles with relevant information and profile pictures.
Post Creation and Interaction: Develop features to allow users to create, publish, and interact with posts through comments, likes, and shares.
Friend Connections: Implement functionality for users to search and connect with friends and manage their friend lists.
Messaging: Develop a messaging system that enables users to send and receive private messages with other users.
Notifications: Implement a notification system to keep users informed about relevant activities, such as new followers, likes, comments, and messages.
Backend
Project Structure Requirements
Establish a well-structured folder hierarchy for the backend codebase.
Use database helpers.
Document all queries and tables related to your database and store them in a folder named "Database Design."
Establish a well-structured folder hierarchy for the backend codebase.
Standardize status codes and messages to communicate response statuses effectively.
Use JWT (JSON Web Tokens) for authentication.
Implement encryption for passwords.
Functional Requirements
API Development: Create a robust and secure API that handles requests from the frontend and interacts with the database.
User Management: Implement functionalities for user registration, login, and profile management.
Post Management: Develop features to handle post creation, retrieval, and interaction (likes, comments, etc.).
Friend Connections: Build mechanisms for users to search and establish friend connections and manage friend lists.
Messaging System: Design and implement a messaging system that handles private message exchanges between users.
Notification System: Develop a system that generates and delivers notifications to users based on their interactions and activities on the platform.
Background Services
For all email services, such as notifying users about new friend connections, set up background services to handle these tasks efficiently.
