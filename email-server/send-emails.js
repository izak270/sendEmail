require('dotenv').config();

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let users = require("./user-details.json");
let sentEmails = 0
const sendMail = (item) => {
    let mailOption = {
        from: process.env.EMAIL,
        to: item.email,
        subject: `Hello ${item.firstName} ...`,
        text: item.lastName,
        attachments: [
            {
                path: process.env.FILEPATH
            }
        ]
    };

    transporter.sendMail(mailOption, function (err, data) {
        if (err) {
            console.log('error occurred', err);
            process.exit(1);
        }
        else {
            sentEmails++
            console.log(`email number ${sentEmails} sent`);
        }
    })
}
let i = 0
function sendSlow() {
    console.log(users.usersIfo[i]);
    sendMail(users.usersIfo[i])
    i++;
    if (i < users.usersIfo.length) {
        setTimeout(sendSlow, 5000);
    }
}
sendSlow()


