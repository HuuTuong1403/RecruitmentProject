const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2) Define the mail option
  const mailOptions = {
    from: 'MST Recruiment <mst.recruitment10@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.content,
  };
  //3) Actually send the mail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
