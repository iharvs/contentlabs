# Content Labs

## Overview
This technical challenge aims to evaluate your full-stack development skills, particularly in microservices, RESTful APIs, frontend development, and containerization using Docker. You will be tasked with building a simple full-stack application that interacts with a MongoDB database, communicates with an external API, and is fully containerized for easy deployment.

## Prerequisites
- Docker
- Docker Compose
- Git

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/iharvs/contentlabs.git
   cd contentlabs
2.	Environment Configuration:
- The project requires environment variables to be configured for both the backend and frontend services. Copy the provided .env files to set up your environment:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   - Ensure that the environment variables in these .env files match your desired setup. The .env files should be pre-configured with sensible defaults.
3.	Build and Run the Docker Containers:
   - Navigate to the project root directory and run the following command to build and start the Docker containers:
  ```bash
  docker-compose up --build
  ```
   This command will:
   - Build the Docker images for the backend and frontend services.
   - Start the MongoDB database container.
   - Start the backend service on port 8000.
   - Start the frontend service on port 3000.
4.	Access the Application:
   - Once the containers are up and running, you can access the application via the following URLs:
      - Frontend: http://localhost:3000
      - Backend API: http://localhost:8000
5.	Stopping the Containers:
   - To stop the running containers, you can use the following command:
   ```bash
   docker-compose down
   ```
6.	Rebuilding the Containers:
   - If you make changes to the Dockerfiles or any dependencies, you might need to rebuild the containers:
   ```bash
   docker-compose up --build
   ```
