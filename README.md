# Chat App

<div align="center"> 

![GitHub License](https://img.shields.io/github/license/atilmohamine/Chat-app)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/atilmohamine/Chat-App/server.yml)

</div>

A real-time chat application built with Express.js, Socket.io, React, MongoDB, and JWT authentication.

<p align="center">
   <img src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/a6d9e2f8-6244-4d67-a62c-9da051fbae35" style="border-radius: 1%">
</p>

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

### Configuring Environment Variables 

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

### Editing allowedOrigins.js

In the server/config directory, edit the `allowedOrigins.js` file:

```javascript
// server/config/allowedOrigins.js

const allowedOrigins = [
    'https://www.yoursite.com',
    'http://localhost:3000'
];

export default allowedOrigins;
```

This configuration indicates that your server will allow requests from <https://www.yoursite.com> and <http://localhost:3000>.

### Editing allowedFileTypes.js

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

### Why These Configurations Matter

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

## Using Docker

### Configuring Environment Variables

Before building the Docker images, make sure to configure the environment variables in the Dockerfiles according to your requirements.

Server Dockerfile (server/Dockerfile)

```Dockerfile
...

# Set environment variables
ENV PORT=your_port \
    DATABASE_URI=your_database_uri \
    ACCESS_TOKEN_SECRET=your_access_token_secret \
    REFRESH_TOKEN_SECRET=your_refresh_token_secret

...
```

Client Dockerfile (client/Dockerfile)

```Dockerfile
...

# Set environment variables
ENV REACT_APP_SERVER_URL=your_server_url

...
```

### Building Docker Images

To build Docker images for both the server and client applications, navigate to the respective directories (server and client) and run:

```bash
    docker build -t chat-server ./server
    docker build -t chat-client ./client
```

Replace chat-server and chat-client with your desired image names.

### Running Docker Containers

After building the Docker images, you can run Docker containers for the server and client applications using the following commands:

Server Container

```bash
    docker run -d -p 3001:3001 --name chat-server chat-server
```

Client Container

```bash
    docker run -d -p 3000:3000 --name chat-client chat-client

```

Replace chat-server and chat-client with your image names, and adjust the port mappings (`-p`) as needed.

The syntax for the `-p` option is `-p HOST_PORT:CONTAINER_PORT`.

- `HOST_PORT`: This is the port on your host machine (the machine running Docker) that you want to map to.
 - `CONTAINER_PORT`: This is the port inside the Docker container that you want to expose.

### Accessing Your App

Once the containers are running, you can access your application at the following URLs:

 - Server: http://localhost:3001
 - Client: http://localhost:3000

## Docker Compose

Create a `.env` file in the server directory with the following environment variables:

```env
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=your_mongodb_database_name
```

Run the following command to start the services defined in the docker-compose.yml file:

```bash
docker-compose up -d
```

Once the services are up and running, you can access the chat application at http://localhost:3000 in your web browser.

## Screenshots

Here are some screenshots showcasing the Chat App:

<p align="center">
   <img src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/76fe8eb7-9d77-451c-b9d3-5a0d74f3492f">
   <img src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/38bf0037-8419-40d5-86f4-62f73b1558a9">
   <img src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/19f19bab-7a89-4a41-a14a-1c43cfc0dc79">
</p>

<p align="center">
   <img width="200px" src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/2a6c462a-ed98-4105-9103-607a96ca6c42">
   <img width="200px" src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/f90eabc9-d862-48f6-a98a-9a6774ea129e">
   <img width="200px" src="https://github.com/AtilMohAmine/Chat-App/assets/86023602/573c5388-190d-4f28-83ac-6cdfabc3ad60">
</p>

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AtilMohAmine/Chat-App/blob/main/LICENSE) file for details.
