const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const authController = require("../../controllers/AuthController");

router.post("/auth/register", async function(req, res)



authController.registerAccount);
router.post("/auth/login", authController.loginAccount);
router.post("/auth/logout", authController.logoutAccount);

/* Protected route, second arg 'auth' is the middleware imported at top */
router.get("/auth/user", auth, authController.getUser);

/* Dummy route used to test authentication */
router.get("/authtest", auth, authController.testingTokens);

module.exports = router;