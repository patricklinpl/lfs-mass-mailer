import nodemailer from 'nodemailer'
require('dotenv').config()

const sendEmail = () => {
    nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ubc.ca',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ACCOUNT_USER,
            pass: process.env.ACCOUNT_PASS 
        }
    });

    const mailOptions = {
        from: '"Patrick Lin 👻" <patrick.lin@sauder.ubc.ca>', 
        to: 'Plin, paatricklinn@gmail.com', 
        subject: 'Hello ✔', 
        text: 'Hello world?', 
        html: '<b>Hello world?</b>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
}

export {
    sendEmail
}
