# Uber Backend Project

## Overview
This project is a backend application for user management, built using Node.js and Express. It provides functionalities for user registration and authentication.

## Project Structure
```
uber-backend
├── controllers
│   └── user.controller.js      # Contains user-related logic
├── routes
│   └── user.routes.js          # Defines user-related routes
├── models
│   └── user.model.js           # Represents the user data structure
├── app.js                       # Entry point of the application
├── package.json                 # Configuration file for npm
└── README.md                    # Documentation for the project
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd uber-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
node app.js
```
The server will start and listen for requests.

## API Endpoints
- **POST /register**: Register a new user. Requires `email`, `fullname.firstname`, and `password` in the request body.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.