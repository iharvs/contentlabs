# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend app
RUN npm run build

# Install serve to serve the frontend app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]