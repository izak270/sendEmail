Welcome to sendMails !!!


0. you need to lower!! your security level on your gmail account in order for this to work on -"https://myaccount.google.com/lesssecureapps" and Allow less secure apps: On.

if you afraid you can open another account.
1. npm install
2. Make a file .env (to keep your personal data) inside of email-server directory
3. Edit .env to look like this:
PASSWORD=//your email password
EMAIL=//your mail address
COOKIE=//go to your linkedin  account and log in! copy the cookie 'li_at' and place it here.
FILEPATH=//if you want to add file put here the path to this file
4. Inside send-mail.js go to sendMail function to change the subject and the content of the mail
5. cd to directory 'email-server' and run node get-emails.js //this will get you all your linkedin email addresses
6. run node send-emails.js //this will send the emails to your linkedin connections
