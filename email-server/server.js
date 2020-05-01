require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
let users = require("../cypress/fixtures/full-details.json");
const sendmail1 = (item) =>{
    let mailOption = {
        from: process.env.EMAIL,
        to: "itzhak27027@gmail.com",
        subject: item["first-name"],
        text: item["first-name"],
        attachments: [
            {
                path: '../cypress/fixtures/full-details.json'
            }
        ]
    };
    transporter.sendMail(mailOption, function (err, data) {        
        if (err) {
            console.log('error occurd',err);
        }
        else {
            console.log('good');  
        }
    })

}
users.usersIfo.forEach(sendmail1)

    

