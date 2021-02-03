const {registerAccount, loginAccount, getUser, logoutAccount} = require("./AuthController");
const dbController = require("./DBController");

const account = { firstName: "jest", lastName: "test", email: "jest.test@mail.com", username: "jest", password: "test" };

beforeAll(async () => {
    return await dbController.jestDB();
});

test('Register fail.', async () => {
    try {
        await registerAccount(account)
    }
    catch(e) {
        expect(e).toStrictEqual({accepted: false, code: 400, error: "email is already in use"});
    }
});

test('Login fail.', async () => {
    try {
        await loginAccount({});
    }
    catch(e) {
        expect(e).toStrictEqual({accepted: false, code: 400, error: "user not found"});
    }
});

test('Login success.', async () => {
    let result1 = await loginAccount(account);
    expect(result1.accepted).toBe(true);
    expect(result1.user.uid+"").toBe("601ad76e68e85d6454a3a6d3");

    let result2 = await getUser(result1);
    expect(result2.accepted).toBe(true);
    expect(result2.user.uid+"").toBe("601ad76e68e85d6454a3a6d3");
});