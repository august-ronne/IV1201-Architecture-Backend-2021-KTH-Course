# IMPORTANT

Download and install the front-end for this application **after** finishing this tutorial.
The front-end and its documentation can be found here:

**https://github.com/august-ronne/iv1201-front-end**


____

# IV1201 Project Group #16: Recruitment Application Front-end

**All links in this README are functioning as of 23/02/2021**

This is the back-end of a reqruitment application built for the KTH Royal Institute of Technology course "IV1201 Arkitektur och design av globala applikationer" (official title), or translated to English, "IV1201 Architecture and Design of Global Applications".


- [Visit official website of the KTH Royal Institute of Technology](https://www.kth.se)


- [Visit official webpage of the IV1201 course](https://www.kth.se/student/kurser/kurs/IV1201)


## Application Explained

The application requirements and description can be found in the pdf linked below:

 https://github.com/august-ronne/iv1201-front-end/blob/master/application-description.pdf

The application currently implements **Use Case 5.1 (Create Account)**, and **Use Case 5.2 (Login)**.
To read about these use cases in greater detail, please refer to the application description linked above.

## Tools Required to Install and Run Application

The requirements listed here need to be met before downloading the code and installing the project in your local environment.
- **[Node.js](https://nodejs.org/en/)**: This front-end is built using Node.js. You need to install Node.js to run this application.
- **[npm](https://www.npmjs.com/)**: The Node Package Manager (npm) is used to build the application and install the frameworks it uses. You need to install npm to run this application.

## Installation and Configuration

1. Clone the repository and run the command `npm install` inside of the `client` directory. This will install the necessary dependencies.
2. Create a file called `.env` in the root directory. Instructions on what needs to be in the file can be found in `.env.example`.

## Run Back-end in Development Environment

1. In the root directory, run the command `npm run dev`
   The back-end is now running on https://localhost:N where N is the port number you defined in the `.env` file

## Run Back-end Tests in Development Environment

To run tests against the back-end development environment, run the command `npm test` in the `client` directory.
This command will launch the test runner in interactive watch mode.
This will run all tests in sequence and output the results in the terminal window that was used run the `npm test` command.

## Back-end Structure
The file tree contained in the `src` directory looks as follows:
```
.
├── api
│   ├── middleware
│   │   └── authenticate.js
│   ├── routes
│   │   ├── authAPI.js
│   │   └── authAPI.test.js
│   └── serverResponses
│       ├── errorResponse.js
│       ├── responseHandler.js
│       └── successResponse.js
├── controllers
│   ├── AuthController.js
│   ├── AuthController.test.js
│   └── DBController.js
├── data
│   ├── Data.js
│   └── Roles.js
├── integration
│   ├── roleDAO.js
│   └── userDAO.js
├── models
│   ├── Role.js
│   └── User.js
├── utils
│   ├── hashing.js
│   ├── tokens.js
│   └── validation.js
├── .env
├── .env.example
├── jest.config.js
└── server.js
 ```
The front-end is built using the React framework. While the general architecture of the front-end will be explained here, the best place to start for anyone without any previous React experience that wishes to continue developing this project would be to consult the official React documentation:
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
- [React - A JavaScript library for building user interfaces](https://reactjs.org/)

### Application Structure Explained

**Components**

Every component in this directory can be said to represent its own view. Some of them, like `Message.js`, is only rendered as an inner component of other components, but could theoretically be rendered on its own.

**Context**

The global state of the front-end is stored here. Currently the global state consists of the status of the user browsing the front-end, for example if the user is authenticated or not. Each component in the whole front-end will have access to the global state.

**HoCs**

HoCs stands for Higher-order Components. These components can not be considered as views on their own, but rather encapsulates other view components in order to generalize some functionality.

**Models**

In this application only the html forms are modeled in the `Models` directory, but other models could be added here if you would need to.
The forms modeled here are used in the `Register.js` and `Login.js`components. The models are created in order to supply the forms with validation.

**Services**
The files in this directory are responsible for calling the API of the back-end/back-ends the front-end wishes to use.

**Styles**
Every CSS file is placed here

**Tests**
Contains acceptance tests

## Frameworks Used

The frameworks that are listed below are installed in your project when you run the `npm install` command.
To read more about any of these frameworks, visit the [npm website](https://www.npmjs.com/) and copy the
**exact** framework name from the list below and paste it in their search bar.

* ...
_____
# iv1201-auth

### (1) Clone repo

### (2) cd /server

### (3) npm install

### (4) create .env file (in /server directory)
  fill .env file with data according to the blueprint .env.example
  
### (4) Start server by running npm start
  
### Test API using Postman (or other tool)
  
### Register User
    POST http://localhost:<SERVER_PORT>/auth/register
    Headers: 
      Content-Type | application/json
    Body (JSON):
      {
      "firstName": "bob",
      "lastName": "bobsson",
      "email": "bob@test.com",
      "username": "bobby",
      "password": "testing"
      }
    
### Login User
    POST http://localhost:<SERVER_PORT>/auth/login
    Headers: 
      Content-Type | application/json
    Body (JSON):
      {
        "email" "bob@test.com",
        "password": "testing"
      }
      
### Get User Data
    GET http://localhost:<SERVER_PORT>/auth/user
    Headers:
      x-auth-token | token value from /login result
    Body (JSON):
      not needed
