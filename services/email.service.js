const nodemailer = require("nodemailer")

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            // service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.MY_EMAIL,
            to: email,
            subject: subject,
            text,
        })
        console.log('Email sent successfully')
    } catch (err) {
        console.log('Email not sent')
        console.log(err)
    }
}