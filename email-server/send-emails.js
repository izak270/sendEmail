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
        subject: `Hello ${item.firstName}-Itzhak Hirschman CV`,
        text:
            `My name is Itzhak Hirschman and I would like to inform you that this email was sent using a script I wrote (with node.js) 
        that automatically pulled out your email address from my Linkedin account and sent you this mail.
        You can take a look at the script in this link: 'https://github.com/izak270/sendEmail'

        I'm looking for a career opportunity as a Junior backend or frontend developer.
        I'll be grateful If you can assist me in distributing my resume to others who are looking for a creative and very passionate web 
        developer.
        
        BR and stay safe,
        Itzhak Hirschman.`,
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
    // sendMail(users.usersIfo[i])
    i++;
    if (i < users.usersIfo.length) {
        setTimeout(sendSlow, 5000);
    }
}
sendSlow()


