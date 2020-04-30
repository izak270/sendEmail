require('dotenv').config();

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

let mailOption = {
    from: process.env.EMAIL,
    to: "izak270@gmail.com",
    subject: 'test',
    text: 'test for text'
};
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
transporter.sendMail(mailOption, function (err, data) {
    console.log( process.env.EMAIL+process.env.PASSWORD);
    
    if (err) {
        console.log('error occurd',err);
    }
    else {
        console.log('good');
    }
})