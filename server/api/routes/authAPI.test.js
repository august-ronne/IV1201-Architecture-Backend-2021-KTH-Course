const appModule = require('../../server')
const {registerAccount, loginAccount, getUser, logoutAccount, deleteAccount, checkUserAuthenticationStatus} = require("../../controllers/AuthController");
const User = require("../../models/User");
const dbController = require("../../controllers/DBController");
const userDAO = require("../../integration/userDAO");
const request = require('supertest');
const mongoose = require("mongoose");
const tokenHandler = require("../../utils/tokens");





const app = appModule.app;

beforeAll(async () => {
    return await dbController.jestDB();
    // mongoose.connect(process.env.DB_CONNECT, {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    // });
    // mongoose.connection.once("open", () => {
    //     // app.emit("mongodb_connection_ready");
    //     console.log("Server connected to MongoDB Atlas");
    // });

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
            email : "jest.test@test.com",
            password: "testtest"
        });

        expect(res.statusCode).toBe(200)
    })

})

describe('GET Endpoints', () => {
    test('auth/logout', async() => {
        let res = await request(app)
        .get('/auth/logout')

        expect(res.statusCode).toBe(200)
    })

    test('auth/userstatus without cookie should not authenticate', async() => {
        let res = await request(app)
        .get('/auth/userstatus')

        expect(JSON.parse(res.text).serverMessage).toHaveProperty('isAuthenticated', false)
    })

    test('auth/userstatus with valid cookie should authenticate', async() => {
        const foundUser = await userDAO.findUserByEmail(User, 'jest.test@test.com');
        const token = tokenHandler.generateToken(foundUser._id);

        let res = await request(app)
        .get('/auth/userstatus')
        .set('Cookie', `access_token=${token}`)

        expect(JSON.parse(res.text).serverMessage).toHaveProperty('isAuthenticated', true)
    })

    test('auth/userstatus with invalid cookie should not authenticate', async() => {
        let res = await request(app)
        .get('/auth/userstatus')
        .set('Cookie', "access_token=wrong")

        expect(res.statusCode).toBe(400)
    })
})