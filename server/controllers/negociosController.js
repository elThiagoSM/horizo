const db = require("../db/connection");

const registrarNegocio = async (req, res) => {
  const {
    usuario_id,
    nombre,
    eslogan,
    slug_url,
    tipo_negocio_id,
    direccion,
    ciudad,
    provincia,
    pais,
    latitud,
    longitud,
    zona_horaria,
    descripcion,
  } = req.body;

  const logo_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (
    !usuario_id ||
    !nombre ||
    !slug_url ||
    !tipo_negocio_id ||
    !ciudad ||
    !pais
  ) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  const query = `
    INSERT INTO negocios (
      usuario_id, nombre, eslogan, slug_url, tipo_negocio_id,
      direccion, ciudad, provincia, pais, latitud, longitud,
      zona_horaria, descripcion, logo_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    usuario_id,
    nombre,
    eslogan || null,
    slug_url,
    tipo_negocio_id,
    direccion || null,
    ciudad,
    provincia || null,
    pais,
    latitud || null,
    longitud || null,
    zona_horaria || null,
    descripcion || null,
    logo_url || null,
  ];

  try {
    const [result] = await db.query(query, valores);

    res.status(201).json({
      mensaje: "Negocio registrado correctamente",
      negocio_id: result.insertId,
      id: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ mensaje: "El slug ya está en uso" });
    }

    res.status(500).json({
      mensaje: "Error al registrar el negocio",
      error: err.sqlMessage || err.message,
    });
  }
};

const tiposNegocios = async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, nombre FROM tipos_negocio");
    res.json(results);
  } catch (err) {
    res.status(500).json({ mensaje: "Error en la DB", error: err.message });
  }
};

const obtenerNegociosPorUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  if (!usuarioId) {
    return res.status(400).json({ mensaje: "Falta el ID del usuario" });
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM negocios WHERE usuario_id = ?`,
      [usuarioId]
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron negocios para este usuario" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({
      mensaje: "Error al obtener los negocios",
      error: err.sqlMessage || err.message,
    });
  }
};

const getDatosPublicosNegocio = async (req, res) => {
  const { slug_url } = req.params;

  try {
    // 1. Obtener el negocio por slug
    const [negocios] = await db.query(
      "SELECT * FROM negocios WHERE slug_url = ?",
      [slug_url]
    );
    if (negocios.length === 0)
      return res.status(404).json({ mensaje: "Negocio no encontrado" });

    const negocio = negocios[0];

    // 2. Obtener configuracion página
    const [configuracion] = await db.query(
      `SELECT cp.*, pc.nombre AS nombre_paleta, pc.color_principal, pc.color_texto, pc.color_boton
       FROM configuracion_pagina cp
       LEFT JOIN paletas_colores pc ON pc.id = cp.paleta_color_id
       WHERE cp.negocio_id = ?`,
      [negocio.id]
    );

    // 3. Obtener redes sociales
    const [redes] = await db.query(
      "SELECT plataforma, enlace FROM redes_sociales WHERE negocio_id = ?",
      [negocio.id]
    );

    // 4. Obtener días laborales y franjas horarias
    const [diasLaborales] = await db.query(
      `SELECT dl.id, ds.nombre AS dia, dl.habilitado
       FROM dias_laborales dl
       JOIN dias_semana ds ON ds.id = dl.dia_semana_id
       WHERE dl.negocio_id = ?`,
      [negocio.id]
    );

    for (let dia of diasLaborales) {
      const [franjas] = await db.query(
        "SELECT hora_inicio, hora_fin FROM franjas_horarias WHERE dia_laboral_id = ?",
        [dia.id]
      );
      dia.franjas_horarias = franjas;
    }

    // 5. Obtener servicios
    const [servicios] = await db.query(
      `SELECT s.*, pv.nombre AS plataforma_virtual, up.nombre AS ubicacion_presencial
       FROM servicios s
       LEFT JOIN plataformas_virtuales pv ON pv.id = s.plataforma_virtual_id
       LEFT JOIN ubicaciones_predefinidas up ON up.id = s.ubicacion_presencial_id
       WHERE s.negocio_id = ?`,
      [negocio.id]
    );

    // 🔚 Enviar todo junto
    res.json({
      negocio,
      configuracion_pagina: configuracion[0] || null,
      redes_sociales: redes,
      dias_laborales: diasLaborales,
      servicios,
    });
  } catch (error) {
    console.error("Error al obtener datos del negocio:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = {
  registrarNegocio,
  tiposNegocios,
  obtenerNegociosPorUsuario,
  getDatosPublicosNegocio,
};
