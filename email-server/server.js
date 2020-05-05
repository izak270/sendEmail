require('dotenv').config();

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let users = require("./test.json");
let sentEmails = 0
const sendMail = (item) =>{
    let mailOption = {
        from: process.env.EMAIL,
        to: item.email,
        subject: `Hello ${item.firstName} my name is Itzhak hirschman and this is my rosome`,
        text: item.lastName,
        attachments: [
            {
                path: './Itzhak Hirschman CV .docx'
            }
        ]
    };
    transporter.sendMail(mailOption, function (err, data) {        
        if (err) {
            console.log('error occurred',err);
        }
        else {
            sentEmails++
            console.log(`email number ${sentEmails} sent`);  
        }
    })
}   
users.usersIfo.forEach(sendMail)

    

