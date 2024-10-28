const express = require("express");
const connectToSMTPServer = require("./smtpServer");
const app = express();

const transporter = connectToSMTPServer();

//test api
app.get("/ping", (req, res) => {
  res.send("pong");
});

//send-mail api
app.get("/send-mail", async (req, res) => {
  const mailOptions = {
    from: `${process.env.NAME} <${process.env.EMAIL_FROM}>`, // sender address
    to: `${process.env.EMAIL_TO}`, // list of receivers
    subject: `SUBJECT`, // Subject line
    text: "Hello text", // plain text body
    html: "<h1>html body</h1>", // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.send({ status: "success", msg: "msg sent successfully" });
  } catch (error) {
    res.send({
      status: "fail",
      msg: error.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${process.env.PORT || 5000}`);
});