const nodemailer = require("nodemailer");

const emailSender = async (email, name ,token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525 ,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"MySkyNatura"verify@myskynatura.pt',
    to: `${email}`,
    subject: "Email Confirmacion",
    text: "",
    html: `Hello ${name}, Please click in this link to confirm your account: <a href="http://95.93.159.118/confirmUser?token=${token}">Click here<a>`, // html body
  });
}

module.exports = emailSender;