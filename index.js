const express = require("express");
const connectToSMTPServer = require("./smtpServer");
const { Mail } = require("./mail");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); //parses the request body
// const transporter = connectToSMTPServer();

//test api
app.get("/ping", (req, res) => {
  res.send("pong");
});

//send-mail api
app.get("/send-mail", async (req, res) => {
  //   const mailOptions = {
  //     from: `${process.env.NAME} <${process.env.EMAIL_FROM}>`, // sender address
  //     to: `${process.env.EMAIL_TO}`, // list of receivers
  //     subject: `SUBJECT`, // Subject line
  //     text: "Hello text", // plain text body
  //     html: "<h1>html body</h1>", // html body
  //   };
  //   try {
  //     const info = await transporter.sendMail(mailOptions);
  //     res.send({ status: "success", msg: "msg sent successfully" });
  //   } catch (error) {
  //     res.send({
  //       status: "fail",
  //       msg: error.message,
  //     });
  //   }

  const mail = new Mail();
  mail.setCompanyName("Harshit Company");
  mail.setTo("harshitku3551@gmail.com");
  mail.setSubject("Subject trial");
  mail.setText("hey , everything all right");
  mail.send();
});

app.post("/mail", async (req, res) => {
  let { companyName, to, subject, text, html } = req.body;

  let htmlData = fs.readFileSync(path.join(__dirname, "mail.html"), "utf-8");
  htmlData = htmlData.replace("Your Business Name", companyName);

  //sending mail
  let mail = new Mail();
  mail.setCompanyName(companyName);
  mail.setTo(to);
  mail.setSubject(subject);
  mail.setText(text);
  mail.setHtml(htmlData);
  await mail.send();
  res.send("Email sent");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${process.env.PORT || 5000}`);
});
