const {registerAccount} = require("./AuthController");
const dbController = require("./DBController");

const account = { firstName: "jest", lastName: "test", email: "jest.test@mail.com", username: "jest", password: "test" };

beforeAll(async () => {
    return await dbController.jestDB();
});

test('Register.', async () => {
    try {
        await registerAccount(account)
    }
    catch(e) {
        expect(e).toStrictEqual({accepted: false, code: 400, error: "email is already in use"});
    }
});