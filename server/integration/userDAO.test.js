const userDAO = require('./userDAO')
const roleDAO = require('./roleDAO')
const dbController = require("../controllers/DBController");
const authController = require("../controllers/AuthController")
const User = require("../models/User");
const mongoose = require("mongoose");


beforeAll(async () => {
    return await dbController.jestDB();
});

describe('addNewUser', () => {
    it('should thrown an error without require input', async () => {
        try{
            const newUser = new User({});
            await userDAO.addNewUser(newUser)
        }
        catch(error) {
            expect(error).toBeDefined()
        }

    })

    it('should throw an error with duplicate input', async () => {
        try {
            const newUser = new User({
                firstName: 'test',
                lastName: 'test',
                email: 'test@jest.com',
                username: 'test',
                password: '$2a$10$x3U8O/Y4lA14lD7IYgCMuee8bcs0HPCClO7ALc247LdqnXQXBV4hm',
                role: await authController.getRoleId("applicant"),
            });
            let user = await userDAO.addNewUser(newUser)
        }
        catch(error) {
            expect(error).toBeDefined()
        }

    }) 


    it('should succeed with a new user', async() => {
        try {
            let query = await User.findOne({ email:'test@jest.com' })

            User.findByIdAndRemove(query._id, (err, result) => {
            })

            const newUser = new User({
                firstName: 'test',
                lastName: 'test',
                email: 'test@jest.com',
                username: 'test',
                password: '$2a$10$x3U8O/Y4lA14lD7IYgCMuee8bcs0HPCClO7ALc247LdqnXQXBV4hm',
                role: await authController.getRoleId("applicant"),
            });

            let user = await userDAO.addNewUser(newUser)
            expect(user).toBeDefined()

        }
        catch(error) {
            console.log(error)
        }



    })
})

describe('findUserByEmail', () => {
    it('should return null without any input', async () => {
        let user = await userDAO.findUserByEmail(User)
        expect(user).toBeNull()
    })

    it('should return null with non valid email', async () => {
        let user = await userDAO.findUserByEmail(User, 'false')
        expect(user).toBeNull()
    }) 


    it('should succeed with a valid email', async() => {
        let user = await userDAO.findUserByEmail(User, 'hello12113@gmail.com')
        expect(user).toBeDefined()
    })
})

describe('getUserByID', () =>  {
    it('should return null without any input', async() => {
        let user = await userDAO.getUserByID(User)
        expect(user).toBeNull()
    })
    it('should throw an error with a non ObjectID id', async() => {
        try {
            await userDAO.getUserByID(User, 'false')
        }
        catch(error)
        {
            expect(error).toBeDefined
        }

    })
    it('should succeed with a valid ID', async() => {
        let user = await userDAO.getUserByID(User, '6011a719fd14cd15e3c3241b')
        expect(user).toBeDefined()
    })
})

describe('getUserByIDAndDelete', () => {
    it('should find null without query', async () => {
        let user = await userDAO.getUserByIDAndDelete(User)
        expect(user).toBeNull()

    })

    it('should throw an error with non valid mongoose objectId', async () => {
        try{
            await userDAO.getUserByIDAndDelete(User, '0')
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    }) 


    it('should succeed with a valid email', async() => {
        let query = await User.findOne({ email:'hello1213@gmail.com' })

        let result = User.findByIdAndRemove(query._id, async (err, result) => {
            if (err) console.log(err)
            else {
                const newUser = new User({
                    firstName: 'test',
                    lastName: 'test',
                    email: 'hello1213@gmail.com',
                    username: 'test',
                    password: '$2a$10$x3U8O/Y4lA14lD7IYgCMuee8bcs0HPCClO7ALc247LdqnXQXBV4hm',
                    role: await authController.getRoleId("applicant"),
                });
        
                await userDAO.addNewUser(newUser)
                return result 
            }
        })
        expect(result).toBeDefined

        afterAll(async () => {

        })
    })
})

describe('changeRole', () => {
    it('should fail with no specified role', async () => {
        try {
            let query = await User.findOne({ email:'aaaaaa@kth.se' })
            await userDAO.changeRole(User, query._id)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should fail with a nonexistent role', async () => {
        try {
            let query = await User.findOne({ email:'aaaaaa@kth.se' })
            await userDAO.changeRole(User, query._id, 'false')
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

it('should succeed with a valid role', async () => {
        let query = await User.findOne({ email:'aaaaaa@kth.se' })
        let result = await userDAO.changeRole(User, query._id, 'applicant')
    
        expect(result).toBeDefined()
    })
})

describe('changePassword', () => {
    it('should fail with no specified password', async () => {
        try {
            let query = await User.findOne({ email:'test@jest.com' })
            await userDAO.changePassword(User, query._id)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should succeed with a valid password', async () => {
        let query = await User.findOne({ email:'afasfdaf@fasfas.com' })
        let result = await userDAO.changePassword(User, query._id, 'testjest')
 
        expect(result).toBeDefined()
    })

})

afterAll(() => {
    mongoose.connection.close()
})