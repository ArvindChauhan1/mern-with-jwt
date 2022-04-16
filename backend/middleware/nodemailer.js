const nodemailer = require('nodemailer')

const sendMail = async (email, message,subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIl,
            pass: process.env.EMAIl_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIl,
        to: email,
        subject,
        html:message,
    }

    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = sendMail;