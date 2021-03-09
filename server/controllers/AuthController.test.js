const {setPassword, recoverAccount, registerAccount, loginAccount, getUser, logoutAccount, deleteAccount, checkUserAuthenticationStatus} = require("./AuthController");
const dbController = require("./DBController");
const userDAO = require("../integration/userDAO");
const mongoose = require("mongoose");
const User = require("../models/User");
const hasher = require("../utils/hashing");
require("dotenv").config();

const account = { firstName: "jest", lastName: "test", email: "test@test.com", username: "jest", password: "testtest" };

const account_new = { firstName: "jest", lastName: "test", email: "jest.test1@mail.com", username: "jest", password: "test" };


beforeAll(async () => {
    return await dbController.jestDB();
});


describe('Register', () => {
    test('Register fail.', async () => {
        try {
            await registerAccount(account)
        }
        catch(e) {
            expect(e).toStrictEqual({ 
                                    code: 400,
                                    isError: true,
                                    msgBody: "error.alreadyRegistered"});
        }
    });
    test('Register success', async() => {
        let user = await userDAO.findUserByEmail(User, 'jest.test1@mail.com')
        if (user) {
            let test = await deleteAccount(user._id)
        }
        let result = await registerAccount(account_new); 
        expect(result).toHaveProperty("isError",false)
    })

})

describe('Login', () => {
    test('Login fail.', async () => {
        try {
            await loginAccount({});
        }
        catch(e) {
            expect(e).toStrictEqual({
                                    code: 400,
                                    msgBody: "error.login",
                                    isError: true});
        }
    });

    test('Login success.', async () => {
        // let result = await loginAccount(account);
        let result = await loginAccount({email:'test@test.com', password:'testtest'});
        expect(result).toHaveProperty("isError",false)
    });

    test('Invalid login credentials', async () => {
        const foundUser = await userDAO.findUserByEmail(User, 'jest.test@mail.com');
        const correctPassword = hasher.compare(foundUser.password, "wrong");
        expect(correctPassword).toBeFalsy();
    })

    test('Valid login credentials', async () => {
        const foundUser = await userDAO.findUserByEmail(User, 'jest.test@mail.com');
        const correctPassword = hasher.compare(foundUser.password, "test");
        expect(correctPassword).toBeTruthy();
    })
})

describe('getUser', () => {
    test('Invalid query', async () => {
        try {
            getUser({object: false})
        }
        catch(error) {
            expect(error).toHaveProperty("accepted",false)
        }
        
    })
})

describe('Authenticate', () => {
    test('should fail with invalid input', async () => {
        try {
            checkUserAuthenticationStatus({object: false})
        }
        catch(error) {
            expect(error).toHaveProperty("accepted",false)
        }
    })
})

describe('Recover account', () => {
    test('should fail with invalid input', async () => {
        try {
            recoverAccount({object: 'invalid'})
        }
        catch(error) {
            expect(error).toHaveProperty("accepted",false)
        }
    })
})

describe('Set password', () => {
    test('should fail with invalid input', async() => {
        try {
            setPassword({object: 'invalid'})
        }
        catch(error) {
            expect(error).toHaveProperty("accepted",false)
        }
    })
})


// afterAll(() => {
//     mongoose.connection.close()
// })