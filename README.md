# IMPORTANT

Download and install the front-end for this application **after** finishing this tutorial.
The front-end and its documentation can be found here:

**https://github.com/august-ronne/iv1201-front-end**


____

# IV1201 Project Group #16: Recruitment Application Back-end

**All links in this README are functioning as of 23/02/2021**

This is the back-end of a reqruitment application built for the KTH Royal Institute of Technology course "IV1201 Arkitektur och design av globala applikationer" (official title), or translated to English, "IV1201 Architecture and Design of Global Applications".


- [Visit official website of the KTH Royal Institute of Technology](https://www.kth.se)


- [Visit official webpage of the IV1201 course](https://www.kth.se/student/kurser/kurs/IV1201)


## 1. Application Explained

The application requirements and description can be found in the pdf linked below:

 https://github.com/august-ronne/iv1201-front-end/blob/master/application-description.pdf

The application currently implements **Use Case 5.1 (Create Account)**, and **Use Case 5.2 (Login)**.
To read about these use cases in greater detail, please refer to the application description linked above.

## 2. Tools Required to Install and Run Application

The requirements listed here need to be met before downloading the code and installing the project in your local environment.
- **[Node.js](https://nodejs.org/en/)**: This back-end is built using Node.js. You need to install Node.js to run this application.
- **[npm](https://www.npmjs.com/)**: The Node Package Manager (npm) is used to build the application and install the frameworks it uses. You need to install npm to run this application.
- **[MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas)**: This back-end stores its persistent data in a MongoDB Atlas Cloud Database. It must be able to connect to the cloud database in order to start. If the back-end can not connect to its database it will shut down before it starts listening for incoming clients. To get started with creating your database, read the section **3. Installation and Configuration** just below.

## 3. Installation and Configuration

1. Clone the repository and run the command `npm install` inside of the `client` directory. This will install the necessary dependencies.
2. Go to https://www.mongodb.com/cloud/atlas and create a MongoDB Atlas account.
3. Go to the [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) to learn how to create and configure your own cluster. You must do some reading on your own here if you want to get it to work. Writing sufficient documentation that takes you through every step of getting MongoDB Atlas to work is way out of the scope of this README
4. Create a file called `.env` in the root directory. Instructions on what needs to be in the file can be found in `.env.example`.

## 4. Run Back-end in Development Environment

1. In the root directory, run the command `npm run dev`
   The back-end is now running on https://localhost:N where N is the port number you defined in the `.env` file

## 5. Run Back-end Tests in Development Environment

To run tests against the back-end development environment, run the command `npm test` in the `client` directory.
This command will launch the test runner in interactive watch mode.
This will run all tests in sequence and output the results in the terminal window that was used run the `npm test` command.

## 6. Back-end and Database Structure

The back-end is built using the Express framework combined with a MongoDB Atlas Cloud Database. While the general architecture of the back-end will be explained here, the best place to start for anyone without any previous Express or MongoDb experience that wishes to continue developing this project would be to consult the official Express and MongoDB documentation:

- [Express - Getting Started](https://expressjs.com/en/starter/installing.html)
- [Express - Fast, unopinionated, minimalist web framework for Node.js ](https://expressjs.com/)

- [MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era](https://www.mongodb.com/)
- [MongoDB - Welcome to the MongoDB Documentation](https://docs.mongodb.com/)


The file tree contained in the `server` directory looks as follows:
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

### Back-end Structure Explained
The back-end is built according the Model-View-Controller (MVC) architectural pattern.
[An Introduction to MVC](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm)

**API**:

The `api` directory can be said to represent the view layer of the back-end. The file `/routes/authAPI.js` is the only file
that a client can send a HTTP request to. The `middleware` and `serverResponses` directories contain helper functionality that
aids the `/routes/authAPI.js` file in parsing and responding to the requests it receives.

A client can call the following methods in the API:
* POST /auth/recover (used for reset password functionality)
* POST /auth/setpassword (used for reset password functionality)
* POST /auth/register (register a new account)
* POST /auth/login (log in an account)
* GET /auth/logout (log out an account)
* GET /auth/userstatus (get status of calling client)
* POST /auth/upgrade (used to assign admin status to existing account)

**Controller**:

Contains the back-end controllers. The `AuthController.js` file helps the View to handle authentication and authorization.
The `DBController` is used by the back-end to connect to its external database.

**Data**:

These files are used to fill the database with the required data the first time you run the back-end.
Read more about the application's database solution in the **Database** section below.

**Integration**:

This directory contains the only files that directly manipulate the data stored in the external database.
Read more about the application's database solution in the **Database** section below.

**Models**:

Contains the Models used by the back-end. `User.js` models the user data that is stored in the external database.
`Role.js` models the role data that is stored in the external database.
Read more about the application's database solution in the **Database** section below.

**Utils**:

Utility functionality used by the back-end to hash sensitive data, generate tokens for users loggging in, and
validate incoming requests.


### Database

As stated above in this section, the back-end uses a MongoDB Cloud Atlas Database to store its persistent data.
The database design is illustrated in this diagram:

<kbd><img src="/readme-images/readme-img-db-design.png" ></kbd>

No manual input or insertion of data is needed to install and run this application. 
As long as your MongoDB Atlas account has a live Cluster that can connect to this back-end (see sections **2. Tools Required to Run and Install Application**,
and **3. Installation and Configuration**) you only have to start the back-end to populate the database with the necessary data.

## Frameworks Used

The frameworks that are listed below are installed in your project when you run the `npm install` command.
To read more about any of these frameworks, visit the [npm website](https://www.npmjs.com/) and copy the
**exact** framework name from the list below and paste it in their search bar.

- bcryptjs
- cookie-parser
- cors
- dotenv
- express
- jest
- joi
- jsonwebtoken
- mongoose
- nodemon
_____
