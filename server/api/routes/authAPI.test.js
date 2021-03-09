const appModule = require('../../server')
const {registerAccount, loginAccount, getUser, logoutAccount, deleteAccount, checkUserAuthenticationStatus} = require("../../controllers/AuthController");
const User = require("../../models/User");
const dbController = require("../../controllers/DBController");
const userDAO = require("../../integration/userDAO");
const roleDAO = require("../../integration/roleDAO");
const request = require('supertest');
const mongoose = require("mongoose");
const tokenHandler = require("../../utils/tokens");





const app = appModule.app;

beforeAll(async () => {
    return await dbController.jestDB();
});



describe('POST Endpoints', () => {
    test('/auth/register', async () => {
        let res = await request(app)
        .post('/auth/register')
        .send({
            test : 'wrong input'
        });

        expect(res.statusCode).toBe(400)
    })
    test('/auth/register', async () => {
        let user = await userDAO.findUserByEmail(User, 'test@jest.com')
        if (user) {
            let test = await deleteAccount(user._id)
        }

        let res = await request(app)
        .post('/auth/register')
        .send({
            firstName : "test",
            lastName : "test",
            email : "test@jest.com",
            username : "test",
            password : "testtest"
        
        })

        expect(res.statusCode).toBe(201)
    })

    test('/auth/login', async() => {
        let res = await request(app)
        .post('/auth/login')
        .send({
            test : 'wrong input'
        });

        expect(res.statusCode).toBe(400)
    })

    test('/auth/login', async() => {
        let res = await request(app)
        .post('/auth/login')
        .send({
            email : "admin@admin.com",
            password: "admin01"
        });

        expect(res.statusCode).toBe(200)
    })

    test('auth/userstatus without token should not authenticate', async() => {
        let res = await request(app)
        .post('/auth/userstatus')

        expect(JSON.parse(res.text).serverMessage).toHaveProperty('isAuthenticated', false)
    })

    test('auth/userstatus with valid token should authenticate', async() => {
        const foundUser = await userDAO.findUserByEmail(User, 'test@test.com');
        // const role = roleDAO.getRoleById(foundUser.role)
        const token = tokenHandler.generateToken(foundUser._id, 'applicant');

        let res = await request(app)
        .post('/auth/userstatus')
        .send({
            token:token
        })

        expect(JSON.parse(res.text).serverMessage).toHaveProperty('isAuthenticated', true)
    })

    test('auth/userstatus with invalid token should not authenticate', async() => {
        let res = await request(app)
        .post('/auth/userstatus')
        .send({
            token:'invalid'
        })

        expect(res.statusCode).toBe(400)
    })

    test('auth/recover should fail with invalid email', async() => {
        let res = await request(app)
        .post('/auth/recover')
        .send({
            email:'invalid'
        })
        let result = JSON.parse(res.text)
        expect(result.serverMessage.code).toBe(400)
    })

    test('auth/recover should respond with a token with valid input', async() => {
        let res = await request(app)
        .post('/auth/recover')
        .send({
            email:'hello1213@gmail.com'
        })

        let result = JSON.parse(res.text)
        expect(result.serverMessage.recoveryToken).toBeDefined()
    })


    
    test('/auth/setpassword should fail with invalid input', async() => {
        let res = await request(app)
        .post('/auth/setpassword')
        .send({
            input:'invalid'
        })

        expect(res.statusCode).toBe(400)
    })

    test('/auth/setpassword should succeed with valid input', async() => {
        const foundUser = await userDAO.findUserByEmail(User, 'aaaaaa@kth.se');
        const token = tokenHandler.generateRecoverToken(foundUser._id);

        let res = await request(app)
        .post('/auth/setpassword')
        .send({
           token: token,
           password: 'new123'
        })

        expect(res.statusCode).toBe(200)
    })

    // exports.setPassword = async ({ token, password })

})

describe('GET Endpoints', () => {
    test('auth/logout', async() => {
        let res = await request(app)
        .get('/auth/logout')

        expect(res.statusCode).toBe(200)
    })
})