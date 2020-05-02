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


let users = require("../cypress/fixtures/full-details.json");

const sendMail = (item) =>{
    let mailOption = {
        from: process.env.EMAIL,
        to: item["email"],
        subject: `Hello ${item["first-name"]} my name is Itzhak hirschman and this is my rosome`,
        text: item["first-name"],
        attachments: [
            {
                path: '../cypress/fixtures/Itzhak Hirschman CV .docx'
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
users.usersIfo.forEach(sendMail)

    

