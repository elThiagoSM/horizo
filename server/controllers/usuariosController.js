const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const enviarCodigoVerificacion = require("../utils/enviarCodigoVerificacion");

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, telefono, contraseña } = req.body;

  if (!nombre || !apellido || !email || !telefono || !contraseña) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  try {
    const hash = await bcrypt.hash(contraseña, 10);

    const query = `
      INSERT INTO usuarios (nombre, apellido, email, telefono, contraseña)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      nombre,
      apellido,
      email,
      telefono,
      hash,
    ]);

    const usuarioId = result.insertId;

    try {
      await enviarCodigoVerificacion(usuarioId, email);
      res.status(201).json({
        mensaje:
          "Usuario registrado correctamente. Se envió un código de verificación.",
        usuario_id: usuarioId,
      });
    } catch (emailError) {
      res.status(500).json({
        mensaje: "Usuario creado, pero falló el envío del código",
        error: emailError.message,
      });
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ mensaje: "El email ya está registrado" });
    }

    res.status(500).json({
      mensaje: "Error al registrar el usuario",
      error: err.message,
    });
  }
};

const verificarCodigo = async (req, res) => {
  const { email, codigo } = req.body;

  if (!email || !codigo) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  try {
    const [resultadosUsuario] = await db.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (resultadosUsuario.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioId = resultadosUsuario[0].id;

    const [resultadosCodigo] = await db.query(
      `SELECT * FROM codigos_verificacion
       WHERE usuario_id = ? AND codigo = ? AND tipo = 'registro' AND usado = FALSE
         AND expiracion > NOW()
       ORDER BY creado_en DESC LIMIT 1`,
      [usuarioId, codigo]
    );

    if (resultadosCodigo.length === 0) {
      return res
        .status(400)
        .json({ mensaje: "Código inválido, usado o expirado" });
    }

    await db.query(
      "UPDATE codigos_verificacion SET usado = TRUE WHERE id = ?",
      [resultadosCodigo[0].id]
    );

    await db.query("UPDATE usuarios SET verificado = 1 WHERE id = ?", [
      usuarioId,
    ]);

    res.status(200).json({ mensaje: "Correo verificado correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error en la verificación", error: err.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  try {
    const [results] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (results.length === 0) {
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña incorrectos" });
    }

    const usuario = results[0];

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

    if (!contraseñaValida) {
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña incorrectos" });
    }

    if (!usuario.verificado) {
      return res
        .status(403)
        .json({ mensaje: "Tu cuenta aún no está verificada" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ mensaje: "JWT_SECRET no configurado en el servidor" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        es_admin: usuario.es_admin,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { contraseña: _, ...usuarioSinContraseña } = usuario;

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: usuarioSinContraseña,
    });
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: err.message });
  }
};

module.exports = {
  registrarUsuario,
  verificarCodigo,
  loginUsuario,
};
