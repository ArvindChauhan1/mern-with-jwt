const sendMail = require('../middleware/nodemailer')
const Otp = require('../models/otpModel')

// generating  Otp
exports.generateOtp = async (req, res,) => {
    const { email } = await req.body
    const otp = Math.floor(1000 + Math.random() * 9000)
    const sentMail = await sendMail(email, `
    <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
    >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
    </div>
    ` ,'Hello ✔')

    if (sentMail === undefined) return (
        res.status(500).json({
            success: false,
            message: 'otp generate failed, please try again!'
        })
    )

    await Otp.create({
        email,
        otp
    }).then(() => {
        res.status(200).json({
            success: true,
            message: "otp sent",
            email,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err
        })
    })
}

exports.verifyOtp = async (email, otp) => {
    let data = await Otp.findOne({ email }, {}, { sort: { 'expireAt': -1 } });
    if (data === null) return false;
    if (otp === data.otp) {
        await Otp.deleteMany({ email })
        return true
    }
}