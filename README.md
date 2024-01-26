# Chat App
A real-time chat application built with Express.js, Socket.io, React, MongoDB, and JWT authentication.

## Features
- **Real-time Chat Functionality:** Real-time chat functionality using Socket.io for bidirectional communication.
- **User Authentication using JWT:** Secure user authentication using JWT (JSON Web Tokens).
- **Responsive and Intuitive User Interface:** The application features a responsive design, ensuring a seamless user experience on various devices, including desktops, tablets, and mobile phones.
- **Creating and Joining Rooms:** Users can create new chat rooms or join existing ones, allowing for organized and topic-specific conversations.
- **Guest User Access with Limited Privileges:** Guest users can access the chat with limited privileges, such as being unable to create rooms.
- **Allowed File Types for Messages:** Support for sharing images and files in the chat.

## Architecture Diagram
Below is the architecture diagram illustrating the components and flow of the Chat App:

<p align="center">
   <img src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/7bd738fc-d830-42e3-a756-623101910f78">
</p>

## Getting Started

### Installation

Clone the repository:
```bash
git clone https://github.com/AtilMohAmine/Chat-App.git
```

Navigate to the project directory:
```bach
cd chat-app
```

Install dependencies for both the server and client:
```bach
cd chat-app/server
npm install

cd ../client
npm install
```

## Configuration

Create a `.env` file in the server directory and set the following environment variables:

```env
PORT=your_port
DATABASE_URI=your_database_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```
Adjust the values according to your preferences.

Create a .env file in the client directory and set the following environment variable:
```env
REACT_APP_SERVER_URL=your_server_url
```

### Editing allowedOrigins.js:

In the server/config directory, edit the `allowedOrigins.js` file:

```javascript
// server/config/allowedOrigins.js

const allowedOrigins = [
    'https://www.yoursite.com',
    'http://localhost:3000'
];

export default allowedOrigins;
```

This configuration indicates that your server will allow requests from https://www.yoursite.com and http://localhost:3000.

### Editing allowedFileTypes.js:
The `allowedFileTypes.js` configuration is specifying which types of files accepted for sending in messages and uploading profile pictures within your chat application.

In the server/config directory, Modify the content of `allowedFileTypes.js` to specify the types of files that are allowed. For example, you might have:
```javascript
// server/config/allowedFileTypes.js

const allowedFileTypes = {
    messages: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
    ],
    profilePictures: [
        'image/jpeg',
        'image/jpg',
        'image/png',
    ],
};

export default allowedFileTypes
```
This configuration provides a structured approach, allowing you to define specific file types for messages and profile pictures. Adjust the file types based on your application's requirements.

### Why These Configurations Matter:

These configurations are essential for security and access control. The allowedFileTypes configuration determines which types of files are accepted by your server, and the allowedOrigins configuration restricts requests to your server from specific domains. Adjust these configurations based on your project's requirements and security policies.

## Usage
Start the server and client:

```bach
# In the server directory
npm start

# In the client directory
npm start
```
This will run the server on the specified port and the client on its respective port.
