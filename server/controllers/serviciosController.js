const db = require("../db/connection");

// 🔧 Crear servicio
const crearServicio = async (req, res) => {
  const {
    negocio_id,
    nombre,
    descripcion,
    duracion_minutos,
    espacio_entre_turnos,
    precio,
    modalidad,
    limite_por_dia,
    permitir_multiples_por_dia,
    disponibilidad_individual,
    formulario_personalizado,
    requiere_aprobacion,
    permitir_cancelacion_cliente,
    plataforma_virtual_id,
    ubicacion_presencial_id,
    enviar_recordatorio_email,
    recordatorio_1_dia_antes,
    recordatorio_1_hora_antes,
    activo = true, // valor por defecto en la tabla
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO servicios (
        negocio_id, nombre, descripcion, duracion_minutos, espacio_entre_turnos, precio, modalidad,
        limite_por_dia, permitir_multiples_por_dia, disponibilidad_individual,
        formulario_personalizado, requiere_aprobacion, permitir_cancelacion_cliente,
        plataforma_virtual_id, ubicacion_presencial_id,
        enviar_recordatorio_email, recordatorio_1_dia_antes, recordatorio_1_hora_antes,
        activo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        negocio_id,
        nombre,
        descripcion,
        duracion_minutos,
        espacio_entre_turnos,
        precio,
        modalidad,
        limite_por_dia,
        permitir_multiples_por_dia,
        disponibilidad_individual,
        formulario_personalizado,
        requiere_aprobacion,
        permitir_cancelacion_cliente,
        plataforma_virtual_id,
        ubicacion_presencial_id,
        enviar_recordatorio_email,
        recordatorio_1_dia_antes,
        recordatorio_1_hora_antes,
        activo,
      ]
    );

    res.status(201).json({ mensaje: "Servicio creado", id: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear servicio", error: error.message });
  }
};

// 📦 Obtener todos los servicios por negocio
const obtenerServicios = async (req, res) => {
  const { negocio_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM servicios WHERE negocio_id = ? AND eliminado_en IS NULL`,
      [negocio_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener servicios", error: error.message });
  }
};

// 🔍 Obtener un servicio por ID
const obtenerServicioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM servicios WHERE id = ? AND eliminado_en IS NULL`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener el servicio", error: error.message });
  }
};

// ✏️ Actualizar servicio
const actualizarServicio = async (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  try {
    const camposSql = Object.keys(campos)
      .map((key) => `${key} = ?`)
      .join(", ");
    const valores = Object.values(campos);

    await db.query(`UPDATE servicios SET ${camposSql} WHERE id = ?`, [
      ...valores,
      id,
    ]);

    res.status(200).json({ mensaje: "Servicio actualizado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar servicio", error: error.message });
  }
};

// ❌ Eliminar servicio (soft delete)
const eliminarServicio = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`UPDATE servicios SET eliminado_en = NOW() WHERE id = ?`, [
      id,
    ]);
    res.status(200).json({ mensaje: "Servicio eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar servicio", error: error.message });
  }
};

module.exports = {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
};
