# Casa Backend

Welcome to the Casa application backend repository! This project is a backend service designed to support the Casa application. It provides a range of functionalities, including user management, data storage, and API endpoints.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Manage user registration and login.
- **Data Management**: CRUD operations for various data models.
- **API Integration**: Easily integrates with frontend or other services.

## Installation

To run the Casa Backend using Docker, follow these steps:

### Prerequisites

- [Docker](https://www.docker.com/get-started) should be installed on your machine.

### Getting Started

1. **Clone the Repository**

   Start by cloning the repository to your local machine:

   ```bash
   git clone https://github.com/UriBaynesay/Casa-Backend.git
   cd Casa-Backend
   ```

2. **Build the Docker Image**

   Use Docker to build the image for the Casa Backend:

   ```bash
   docker build -t casa-backend .
   ```

3. **Run the Docker Container**

   Run the Docker container using the built image:

   ```bash
   docker run -p 3030:3030 casa-backend
   ```

4. **Verify the Container is Running**

   Check if the container is running properly:

   ```bash
   docker ps
   ```

   You should see the `casa-backend` container listed.

5. **Access the Application**

   Open your web browser and navigate to `http://localhost:3030` to access the Casa Backend service.


### Stopping the Application

To stop the running Docker container:

```bash
docker stop casa-backend
```

## Usage

Once the server is running, you can interact with it through the available API endpoints. For detailed information on available endpoints, refer to the [API Endpoints](#api-endpoints) section.

## API Endpoints

Here are some example API endpoints:

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.
- **GET /api/users/:id**: Get user details by ID.
- **PUT /api/users/:id**: Update user details.
- **DELETE /api/users/:id**: Delete a user.
