# TaskNest

Simple overview of use/purpose.<within 1 line>

## Description 

An in-depth paragraph about your project and overview of use.

## Installation Guide

### Prerequisites

Ensure you have the access to following in your system:
* Node.js
* npm (Node Package Manager)
* Working MongoDB connection string
* Gmail Email service

### Set Up

* Clone the repository using following command.

git clone <repo link>

* Run the following commands to install required modules for the frontend.

cd frontend
npm install


* To install the required modules for backend run the following command

cd backend
npm install


* Navigate to backend folder and create a .ENV file there.
* .ENV structure is as follows.


DATABASE_URL=<mongoDB-connection-string>
ACCESS_TOKEN_SECRET=<your_secret_key_for_jwt>
PORT=<frontend-port>

EMAIL_SERVICE=gmail
EMAIL_USER=<gmail_address>
EMAIL_PASS=<gmail_password>


### Executing program

* To run the backend

npm start


* To run the frontend

npm start


## Authors

* <your name with hyper link to github profile>

## Version History

* 0.1
    * Initial Release
