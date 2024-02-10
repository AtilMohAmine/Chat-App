# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code to the container
COPY . .

# Expose the port the server runs on
EXPOSE 5000

# Command to run the server
CMD ["npm", "start"]
