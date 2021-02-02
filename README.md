# iv1201-auth

# iv1201-express-auth-server

## Clone repo

## cd /server

## npm install

## create .env file (in /server directory)
  fill .env file with data according to the blueprint .env.example
  
## Test API using Postman (or other tool)
  
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
