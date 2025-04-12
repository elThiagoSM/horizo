const db = require("../db/connection");
const nodemailer = require("nodemailer");

const generarCodigo = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const enviarCodigoVerificacion = async (usuarioId, email) => {
  const codigo = generarCodigo();

  const ahora = new Date();
  const expiracion = new Date(ahora.getTime() + 15 * 60000); // 15 minutos

  db.query(
    `INSERT INTO codigos_verificacion (usuario_id, codigo, tipo, expiracion)
     VALUES (?, ?, 'registro', ?)`,
    [usuarioId, codigo, expiracion],
    (err) => {
      if (err) {
        console.error("Error al guardar código de verificación:", err);
      }
    }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Reserva Ahora" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Código de verificación",
    html: `<p>Tu código de verificación es: <strong>${codigo}</strong><br>Expira en 15 minutos.</p>`,
  });
};

module.exports = enviarCodigoVerificacion;
