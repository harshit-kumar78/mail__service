const nodemailer = require("nodemailer");
require("dotenv").config();

//function to connect to the SMTP server
function connectToSMTPServer() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  return transporter;
}

module.exports = connectToSMTPServer;
