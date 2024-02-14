# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code to the container
COPY . .

# Make the script executable
RUN chmod +x set_server_url.sh

# Expose the port the client runs on
EXPOSE 3000

# Set REACT_APP_SERVER_URL using the script if the environment variable is set
ENTRYPOINT ["/bin/bash", "-c", "if [ \"$SET_SERVER_URL\" = \"true\" ]; then ./set_server_url.sh; fi && exec npm start"]
