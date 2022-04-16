const router = require('express').Router();

const { generateOtp,getOtp } = require('../controllers/otpController')

router.route("/otp").post(generateOtp);

module.exports = router;