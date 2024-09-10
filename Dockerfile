# Use the official Node.js image with version 22
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend folder
COPY ./frotend /app/frotend

# Build the frontend inside the container
RUN cd /app/frotend && npm install && npm run build

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
