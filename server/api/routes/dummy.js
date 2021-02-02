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
    try {
        let result = await authController.registerAccount(req.body)
        res.status(200).json(result);
    }
    catch(e) {
        errorHandler(e, res);
    }
});



router.post("/auth/login", authController.loginAccount);
router.post("/auth/logout", authController.logoutAccount);

/* Protected route, second arg 'auth' is the middleware imported at top */
router.get("/auth/user", auth, authController.getUser);

/* Dummy route used to test authentication */
router.get("/authtest", auth, authController.testingTokens);

module.exports = router;