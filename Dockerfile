# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 3000

# Start the application
CMD ["node", "-r", "tsconfig-paths/register", "dist/server.js"]