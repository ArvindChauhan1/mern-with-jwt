const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const user = require('./routes/userRouter')
const otp = require('./routes/otpRouter')

app.use("/api/v1", otp, user)

module.exports = app;