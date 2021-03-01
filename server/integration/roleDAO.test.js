const userDAO = require('./userDAO')
const roleDAO = require('./roleDAO')
const dbController = require("../controllers/DBController");
const authController = require("../controllers/AuthController")
const User = require("../models/User");
const Role = require("../models/Role");
const mongoose = require("mongoose");


beforeAll(async () => {
    return await dbController.jestDB();
});

describe('findRoleByName', () => {
    it('should thrown an error with no input', async() => {
        try {
            await roleDAO.findRoleByName(Role)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should throw an error with a non existent role', async() => {
        try {
            await roleDAO.findRoleByName(Role, 'false')
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should succeed with a correct query', async() => {
        let result = await roleDAO.findRoleByName(Role, 'applicant')
        expect(result).toHaveProperty('name','applicant')
    })
})

describe('getRoleById', () => {
    it('should thrown an error with no input', async() => {
        try {
            await roleDAO.getRoleById(Role)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should throw an error with a false id', async() => {
        try {
            await roleDAO.getRoleById(Role, 'false')
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should succeed with a correct query', async() => {
        let result = await roleDAO.getRoleById(Role, '602e781dc6bf8233fa6df0b2')
        expect(result).toHaveProperty('name','applicant')
    })
})

describe('addNewRole', () => {
    it('should thrown an error with no input', async() => {
        try {
            await roleDAO.addNewRole(Role)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
    })

    it('should succeed with a valid input', async() => {
        let query = await roleDAO.findRoleByName(Role, 'test')

        if (query)
            await Role.findByIdAndRemove(query._id, async (err, result) => {})

        await roleDAO.addNewRole(Role, 'test')

    })
})

afterAll(() => {
    mongoose.connection.close()
})