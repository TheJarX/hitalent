const nodemailer = require("nodemailer");

async function sendEmail(userData, url) {
  const { email, token, _id } = userData;
  const urlParamToSend = [token, _id].join("$");
  const link = `${url}video/1?valid=${urlParamToSend}`;
  const bodyHTML = `
  <h1>Bienvenido a HiTalent! 🎉</h1>
  <p>
    Nos alegra tenerte aquí, usa <a href="${link}">este enlace🔗</a> para acceder al vídeo que te prometimos.
  </p>
  <br>
  <p>
    Si no te funcionó ese enlace puedes copiar y pegar este en tu navegador: 
    ${link}
  </p>
  <sub>
    Si experimentas algún problema con este mensaje o con la plataforma, puedes responder a este correo o
    enviar un mail a hello@itsgerard.com 👀
  </sub>
  `;

  console.log({data: [process.env.EMAIL_USER, process.env.EMAIL_PW]})

  let transporter = nodemailer.createTransport({
    host: "mail.hitalentcourses.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: '"HiTalent" <hola@hitalentcourses.com>', // sender address
    to: email,
    subject: "Bienvenido! 👋 🎉",
    text: "Su aplicación de correos no soporta HTML, intente en otro proveedor.",
    html: bodyHTML,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendEmail,
};
