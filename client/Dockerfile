# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ENV REACT_APP_SERVER_URL=your_server_url

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code to the container
COPY . .

# Expose the port the client runs on
EXPOSE 3000

# Command to run the client
CMD ["npm", "start"]
