# TaskNest

A simple website to create a To-DO List.

## Functionalities

* Task Management(Dashboard):
    * Create, update, and delete tasks.
    * View all tasks and sort them by date and time.
    * Highlight tasks for the current day for better prioritization.

* User Authentication and Security:
    * User registration and login functionality for secure access.
    * "Forgot Password" feature with an email verification process for account recovery.
    * Change password feature to enhance account security.
      
* User Information and Account Management:
    * Click on the user icon in the header to access:
         * View Profile: Displays user information in a dedicated profile section.
         * Logout: Securely log out from the application to protect user sessions.

## Installation Guide

### Prerequisites

Ensure you have the access to following in your system:
* Node.js
* npm (Node Package Manager)
* Working MongoDB connection string
* Gmail Email service

### Set Up

* Clone the repository using following command.
```
git clone https://github.com/GaveeshaWickrama/TaskNest.
```
* Run the following commands to install required modules for the frontend.
```
cd frontend
npm install
```

* To install the required modules for backend run the following command
```
cd backend
npm install
```

* Navigate to backend folder and create a .env file there.
* .env structure is as follows.

```
DATABASE_URL=<mongoDB-connection-string>
ACCESS_TOKEN_SECRET=<your_secret_key_for_jwt>
PORT=5000

EMAIL_SERVICE=gmail
EMAIL_USER=<gmail_address>
EMAIL_PASS=<gmail_password>
```

### Executing program

* To run the backend
```
npm run dev
```

* To run the frontend
```
npm run dev
```

