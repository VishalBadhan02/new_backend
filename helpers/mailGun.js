// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '1db3d4f396bd9f5a7c3273df619f64ed-826eddfb-d8d2a0b0' });

// mg.messages.create('sandbox-123.mailgun.org', {
//   from: "Excited User <mailgun@sandbox1a2327de51704d699ace2f92730a7d6f.mailgun.org>",
//   to: ["vishalbadhan81@gmail.com"],
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
//   html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
//   .then(msg => console.log(msg)) // logs response data
//   .catch(err => console.log(err)); // logs any error




const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "vishalbadhan81@gmail.com",
    pass: "4j80HA1tMTp69UhD",
  },
});

// async..await is not allowed in global scope, must use a wrapper
const SendMail = async (toemail, subject, message) => {
  // send mail wi th defined transport object
  const info = await transporter.sendMail({
    from: '"vishal.badhan@academor.com', // sender address
    to: toemail,
    subject: subject,
    html: message,
  });
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = SendMail;
