# TaskNest

A simple website to create a To-DO List.

## Description 

Can Create, Update, Delete tasks, View all tasks and Sort by date and time. 

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


