const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { verifyOtp } = require('./otpController');
const sendMail = require('../middleware/nodemailer');

// creating User
exports.registerUser = async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { name, email, password, otp } = req.body;

        // Validate user input
        if (!(email && password && name && otp)) {
            res.status(400).send("All input is required");
        }

        //verify otp
        const isValid = await verifyOtp(email, otp)

        //if otp is invalid
        if (!isValid) return (
            res.status(401).json({
                success: false,
                message: "invalid OTP"
            })
        )

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        await sendMail(user.email, `
        <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
        >
            <h2>Welcome to the club.</h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${`Congratulations you're member now`}</h1>
        </div>
        `, 'Welcome ✔')

        res.status(201).json({
            success: true,
            message: "user registered successfully"
        });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}

exports.loginUser = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = await jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token

            // user 
            return res.status(202).json({
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "__v": user._v,
                "token": token
            });
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our login logic ends here
}

exports.getUser = async (req, res) => {
    const { user: { user_id } } = req
    const user = await User.findById(user_id).select("_id name email ")
    res.status(200).json(user)
}

exports.updateUser = async (req, res) => {
    const { user: { user_id } } = await req;
    let user = await User.findById(user_id)

    if (!user) {
        return (res.status(500).json({
            success: false,
            message: "Product not found",
        }))
    }

    try {
        user = await User.findByIdAndUpdate(user_id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).send({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            message: false,
            error
        })
    }

}