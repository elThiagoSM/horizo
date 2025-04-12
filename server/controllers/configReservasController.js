const db = require("../db/connection");

// 🗓️ DÍAS LABORALES

const crearDiaLaboral = async (req, res) => {
  const { negocio_id, dia_semana, habilitado = false } = req.body;

  if (!negocio_id || dia_semana === undefined) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO dias_laborales (negocio_id, dia_semana_id, habilitado) VALUES (?, ?, ?)`,
      [negocio_id, dia_semana, habilitado]
    );
    res
      .status(201)
      .json({ mensaje: "Día laboral creado", id: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear día laboral", error: error.message });
  }
};

const actualizarDiaLaboral = async (req, res) => {
  const { id } = req.params;
  const { habilitado, eliminado_en = null } = req.body;

  try {
    await db.query(
      `UPDATE dias_laborales SET habilitado = ?, eliminado_en = ? WHERE id = ?`,
      [habilitado, eliminado_en, id]
    );
    res.status(200).json({ mensaje: "Día laboral actualizado" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar día laboral",
      error: error.message,
    });
  }
};

const obtenerDiasLaborales = async (req, res) => {
  const { negocio_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT dl.*, ds.nombre AS dia_nombre 
       FROM dias_laborales dl
       JOIN dias_semana ds ON dl.dia_semana_id = ds.id
       WHERE dl.negocio_id = ? AND dl.eliminado_en IS NULL`,
      [negocio_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener días laborales",
      error: error.message,
    });
  }
};

// 🕐 FRANJAS HORARIAS

const crearFranjaHoraria = async (req, res) => {
  const { dia_laboral_id, hora_inicio, hora_fin } = req.body;

  if (!dia_laboral_id || !hora_inicio || !hora_fin) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO franjas_horarias (dia_laboral_id, hora_inicio, hora_fin) VALUES (?, ?, ?)`,
      [dia_laboral_id, hora_inicio, hora_fin]
    );
    res
      .status(201)
      .json({ mensaje: "Franja horaria creada", id: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear franja horaria", error: error.message });
  }
};

const actualizarFranjaHoraria = async (req, res) => {
  const { id } = req.params;
  const { hora_inicio, hora_fin, eliminado_en = null } = req.body;

  try {
    await db.query(
      `UPDATE franjas_horarias SET hora_inicio = ?, hora_fin = ?, eliminado_en = ? WHERE id = ?`,
      [hora_inicio, hora_fin, eliminado_en, id]
    );
    res.status(200).json({ mensaje: "Franja horaria actualizada" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar franja horaria",
      error: error.message,
    });
  }
};

const obtenerFranjasHorarias = async (req, res) => {
  const { dia_laboral_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM franjas_horarias WHERE dia_laboral_id = ? AND eliminado_en IS NULL`,
      [dia_laboral_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener franjas horarias",
      error: error.message,
    });
  }
};

const eliminarFranjaHoraria = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado_en = new Date(); // timestamp actual
    await db.query(
      `UPDATE franjas_horarias SET eliminado_en = ? WHERE id = ?`,
      [eliminado_en, id]
    );
    res.status(200).json({ mensaje: "Franja horaria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar franja horaria",
      error: error.message,
    });
  }
};

// 👇 EXPORTAR TODO

module.exports = {
  crearDiaLaboral,
  actualizarDiaLaboral,
  obtenerDiasLaborales,
  crearFranjaHoraria,
  actualizarFranjaHoraria,
  obtenerFranjasHorarias,
  eliminarFranjaHoraria,
};
