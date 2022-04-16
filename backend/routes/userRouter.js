const router = require('express').Router();
const auth = require("../middleware/auth");

const { registerUser, loginUser, getUser, updateUser } = require('../controllers/userControllers')

router.route("/user/register").post(registerUser);
router.route("/auth/login").post(loginUser);

router.route("/user/self").get(auth, getUser);
router.route("/user/update").post(auth, updateUser);

module.exports = router;