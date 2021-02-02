const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const authController = require("../../controllers/AuthController");

function errorHandler(error, res) {
    if(error.code) {
        res.status(error.code).json(error);
    }
    else {
        res.status(500).json({accepted: false, error: error});
    }
    res.send();
}

router.post("/auth/register", async (req, res) => {
    let { firstName, lastName, email, username, password } = req.body;
    if(!firstName || !lastName || !email || !username || !password)
        res.status(400).json({accepted: false, error: "Credentials missing"});

    try {
        let result = await authController.registerAccount(req.body)
        res.status(200).json(result);
    }
    catch(e) {
        errorHandler(e, res);
    }
});



router.post("/auth/login", async (req, res) => {
    let { email, password} = req.body;
    if (!email || !password)
        res.status(400).json({accepted: false, error: "Credentials missing"});
    try {
        let result = await authController.loginAccount(req.body);
        res.status(200).json(result);
    }
    catch(e) {
        errorHandler(e, res);
    }
});


router.post("/auth/logout", function(req, res) {
    res.status(200).json({accepted: true, token: null})
});

/* Protected route, second arg 'auth' is the middleware imported at top */
router.get("/auth/user", auth, async (req, res) => {
    try {
        let result = await authController.getUser(req);
        res.status(200).json(result)
    }
    catch(e) {
        res.status(500).json({accepted:false, error:e});
    }

});

/* Dummy route used to test authentication */
// router.get("/authtest", auth, authController.testingTokens);

module.exports = router;