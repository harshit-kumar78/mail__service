const connectToSMTPServer = require("./smtpServer");
require("dotenv").config();
const transporter = connectToSMTPServer();

class Mail {
  constructor() {
    this.mailOptions = {
      from: {
        name: process.env.NAME,
        address: process.env.EMAIL_FROM,
      },
      subject: process.env.SUBJECT,
      text: process.env.TEXT,
      // html: "<h1>html body</h1>",
    };
  }
  /**
   * Sets the name of the company that is sending the mail.
   *
   * @param {string} name - the name of the company.
   */
  setCompanyName(name) {
    this.mailOptions.from.name = name;
  }
  /**
   * Sets the email address of the sender
   *
   * @Param {string} email - the email address of the sender
   */
  setSenderEmail(email) {
    this.mailOptions.from.address = email;
  }

  /**
   * Sets the email address of the recipient
   *
   * @param {string} receiver - the email address of the recipient
   */
  setTo(receiver) {
    let receivers = this.mailOptions.to || [];
    receivers.push(receiver);
    this.mailOptions.to = receivers;
  }

  /**
   * Set the cc of the email
   * @param {string} cc - the cc of the email
   */
  setCC(cc) {
    let ccs = this.mailOptions.cc || [];
    ccs.push(cc);
    this.mailOptions.cc = ccs;
  }

  /**
   * Set the bcc of the email
   * @param {string} bcc - the bcc of the email
   */
  setBcc(bcc) {
    let bccs = this.mailOptions.bcc || [];
    bccs.push(bcc);
    this.mailOptions.bcc = bccs;
  }
  /**
   * Sets the subject of the email
   *
   * @Param {string} subject - the subject of the email
   */
  setSubject(subject) {
    this.mailOptions.subject = subject;
  }

  /**
   * Sets the text of the email
   *
   * @param {String} text - the text of the email
   */
  setText(text) {
    this.mailOptions.text = text;
  }

  /**
   * Sets the HTML content of the email
   *
   * @param {String} html
   */
  setHtml(html) {
    this.mailOptions.html = html;
  }

  /**
   * Sets the attachment of the email
   *
   * @param {string} attachments - the attachment of the email
   */

  setAttachments(attachment) {
    let attachments = this.mailOptions.attachments || [];
    attachments.push(attachment);
    this.mailOptions.attachments = attachments;
  }

  /**
   * send the mail
   * @return {void} does not return anything
   */

  async send() {
    try {
      const result = await transporter.sendMail(this.mailOptions);
      console.log("Email sent: " + result.response);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = { Mail };
