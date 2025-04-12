const db = require("../db/connection");

// Obtener configuración completa del negocio
const getConfiguracionNegocio = async (req, res) => {
  const { negocio_id } = req.params;

  try {
    // Obtener datos del negocio
    const [negocios] = await db.query(
      `SELECT nombre, descripcion, eslogan, slug_url, tipo_negocio_id, direccion, ciudad, provincia, pais, latitud, longitud, zona_horaria, logo_url
           FROM negocios WHERE id = ?`,
      [negocio_id]
    );
    if (negocios.length === 0)
      return res.status(404).json({ mensaje: "Negocio no encontrado" });

    // Configuración de página
    const [config] = await db.query(
      `SELECT cp.*, pc.nombre AS nombre_paleta, pc.color_principal, pc.color_texto, pc.color_boton
           FROM configuracion_pagina cp
           LEFT JOIN paletas_colores pc ON pc.id = cp.paleta_color_id
           WHERE cp.negocio_id = ?`,
      [negocio_id]
    );

    // Redes sociales actuales
    const [redes] = await db.query(
      `SELECT id, plataforma, enlace FROM redes_sociales WHERE negocio_id = ?`,
      [negocio_id]
    );

    // Plataformas posibles (enum de la columna `plataforma`)
    const [columnData] = await db.query(
      `SHOW COLUMNS FROM redes_sociales LIKE 'plataforma'`
    );
    const enumStr = columnData[0].Type; // "enum('facebook','instagram',...)"
    const plataformas_posibles = enumStr
      .match(/enum\((.*)\)/)[1]
      .split(",")
      .map((val) => val.replace(/'/g, ""));

    // Todas las paletas disponibles
    const [paletas] = await db.query(
      `SELECT id, nombre, color_principal, color_texto, color_boton
           FROM paletas_colores
           WHERE eliminado_en IS NULL`
    );

    // Tipos de negocio
    const [tiposNegocio] = await db.query(
      `SELECT id, nombre, descripcion, icono
           FROM tipos_negocio
           WHERE eliminado_en IS NULL`
    );

    res.json({
      negocio: negocios[0],
      configuracion_pagina: config[0] || null,
      redes_sociales: redes,
      plataformas_redes_sociales: plataformas_posibles,
      paletas_colores: paletas,
      tipos_negocio: tiposNegocio,
    });
  } catch (error) {
    console.error("Error al obtener configuración del negocio:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

// Editar datos del negocio
const editarNegocio = async (req, res) => {
  const { negocio_id } = req.params;
  const {
    nombre,
    descripcion,
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
    logo_url,
  } = req.body;

  try {
    await db.query(
      `UPDATE negocios SET nombre = ?, descripcion = ?, eslogan = ?, slug_url = ?, tipo_negocio_id = ?, direccion = ?, ciudad = ?, provincia = ?, pais = ?, latitud = ?, longitud = ?, zona_horaria = ?, logo_url = ?
       WHERE id = ?`,
      [
        nombre,
        descripcion,
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
        logo_url,
        negocio_id,
      ]
    );
    res.json({ mensaje: "Negocio actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar negocio:", error);
    res.status(500).json({ mensaje: "Error al actualizar negocio" });
  }
};

// Editar configuración de colores
const editarConfiguracionPagina = async (req, res) => {
  const { negocio_id } = req.params;
  const {
    paleta_color_id,
    mostrar_marca_agua,
    colores_personalizados_activados,
    color_personalizado_primario,
    color_personalizado_texto,
    color_personalizado_boton,
  } = req.body;

  try {
    const [rows] = await db.query(
      `SELECT id FROM configuracion_pagina WHERE negocio_id = ?`,
      [negocio_id]
    );

    if (rows.length > 0) {
      await db.query(
        `UPDATE configuracion_pagina
         SET paleta_color_id = ?, mostrar_marca_agua = ?, colores_personalizados_activados = ?, color_personalizado_primario = ?, color_personalizado_texto = ?, color_personalizado_boton = ?
         WHERE negocio_id = ?`,
        [
          paleta_color_id,
          mostrar_marca_agua,
          colores_personalizados_activados,
          color_personalizado_primario,
          color_personalizado_texto,
          color_personalizado_boton,
          negocio_id,
        ]
      );
    } else {
      await db.query(
        `INSERT INTO configuracion_pagina
         (negocio_id, paleta_color_id, mostrar_marca_agua, colores_personalizados_activados, color_personalizado_primario, color_personalizado_texto, color_personalizado_boton)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          negocio_id,
          paleta_color_id,
          mostrar_marca_agua,
          colores_personalizados_activados,
          color_personalizado_primario,
          color_personalizado_texto,
          color_personalizado_boton,
        ]
      );
    }

    res.json({ mensaje: "Configuración de página actualizada correctamente" });
  } catch (error) {
    console.error("Error al editar configuración de página:", error);
    res
      .status(500)
      .json({ mensaje: "Error al actualizar configuración de página" });
  }
};

// Agregar red social
const agregarRedSocial = async (req, res) => {
  const { negocio_id } = req.params;
  const { plataforma, enlace } = req.body;

  try {
    await db.query(
      `INSERT INTO redes_sociales (negocio_id, plataforma, enlace)
       VALUES (?, ?, ?)`,
      [negocio_id, plataforma, enlace]
    );

    res.status(201).json({ mensaje: "Red social agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar red social:", error);
    res.status(500).json({ mensaje: "Error al agregar red social" });
  }
};

// Obtener los datos necesarios para el Inicio en el Dashboard
const obtenerInicioDashboard = async (req, res) => {
  const { negocioId } = req.params;

  try {
    const conn = await db.getConnection();

    // 1. Bienvenida personalizada (datos del dueño y del negocio)
    const [bienvenida] = await conn.query(
      `
      SELECT 
        u.nombre AS nombre_usuario,
        u.apellido AS apellido_usuario,
        n.nombre AS nombre_negocio,
        CONCAT(u.nombre, ' ', u.apellido) AS dueno_negocio
      FROM negocios n
      JOIN usuarios u ON u.id = n.usuario_id
      WHERE n.id = ?
    `,
      [negocioId]
    );

    // 2. Resumen de actividad
    const [actividad] = await conn.query(
      `
      SELECT
        COUNT(CASE WHEN r.fecha = CURDATE() THEN 1 END) AS reservas_hoy,
        COUNT(CASE WHEN YEARWEEK(r.fecha, 1) = YEARWEEK(CURDATE(), 1) THEN 1 END) AS reservas_semana,
        COUNT(CASE WHEN MONTH(r.fecha) = MONTH(CURDATE()) AND YEAR(r.fecha) = YEAR(CURDATE()) THEN 1 END) AS reservas_mes,
        (
          SELECT CONCAT(r2.fecha, ' ', r2.hora)
          FROM reservas r2
          WHERE r2.negocio_id = ? AND r2.fecha >= CURDATE()
          ORDER BY r2.fecha ASC, r2.hora ASC
          LIMIT 1
        ) AS proxima_reserva,
        COUNT(CASE WHEN r.estado = 'aprobada' THEN 1 END) AS total_aprobadas,
        COUNT(CASE WHEN r.estado = 'pendiente' THEN 1 END) AS total_pendientes,
        COUNT(CASE WHEN r.estado = 'cancelada' THEN 1 END) AS total_canceladas
      FROM reservas r
      WHERE r.negocio_id = ? AND r.eliminado_en IS NULL
    `,
      [negocioId, negocioId]
    );

    // 3. Resumen del último mes (rendimiento)
    const [resumenMes] = await conn.query(
      `
      SELECT
        COUNT(*) AS total_reservas_mes,
        SUM(CASE WHEN estado = 'aprobada' THEN 1 ELSE 0 END) AS total_aprobadas_mes,
        SUM(CASE WHEN estado = 'cancelada' THEN 1 ELSE 0 END) AS total_canceladas_mes
      FROM reservas
      WHERE negocio_id = ? 
        AND fecha >= CURDATE() - INTERVAL 1 MONTH
        AND eliminado_en IS NULL
    `,
      [negocioId]
    );

    // 4. Gráfico de reservas por rangos
    const rangos = [
      { clave: "ultimos_7_dias", dias: 7 },
      { clave: "ultimos_15_dias", dias: 15 },
      { clave: "ultimo_mes", dias: 30 },
      { clave: "ultimos_6_meses", dias: 180 },
      { clave: "ultimo_anio", dias: 365 },
    ];

    const grafico_reservas = {};

    for (const rango of rangos) {
      const [datos] = await conn.query(
        `
        SELECT 
          r.fecha,
          COUNT(*) AS total_reservas,
          SUM(CASE WHEN r.estado = 'aprobada' THEN 1 ELSE 0 END) AS total_aprobadas,
          SUM(CASE WHEN r.estado = 'cancelada' THEN 1 ELSE 0 END) AS total_canceladas
        FROM reservas r
        WHERE r.negocio_id = ?
          AND r.fecha >= CURDATE() - INTERVAL ? DAY
          AND r.eliminado_en IS NULL
        GROUP BY r.fecha
        ORDER BY r.fecha ASC
      `,
        [negocioId, rango.dias]
      );

      grafico_reservas[rango.clave] = datos;
    }

    conn.release();

    res.json({
      bienvenida: bienvenida[0],
      actividad: actividad[0],
      resumen_mes: resumenMes[0],
      grafico_reservas,
    });
  } catch (error) {
    console.error("❌ Error en obtenerInicioDashboard:", error);
    res.status(500).json({ error: "Error al obtener los datos del dashboard" });
  }
};

// Obtener todas las reservas (con información de servicios y negocios)
const obtenerReservas = async (req, res) => {
  const negocio_id = req.params.negocio_id;

  if (isNaN(negocio_id)) {
    return res.status(400).json({ error: "ID de negocio inválido" });
  }

  try {
    const [reservas] = await db.execute(
      `
      SELECT 
        r.id,
        r.fecha,
        r.hora,
        r.cliente_nombre,
        r.cliente_apellido,
        r.cliente_email,
        r.cliente_telefono,
        r.nota,
        r.estado,
        r.requiere_aprobacion,
        r.creada_en,
        s.nombre AS servicio_nombre,
        s.duracion_minutos,
        n.nombre AS negocio_nombre,
        n.slug_url
      FROM reservas r
      JOIN servicios s ON r.servicio_id = s.id
      JOIN negocios n ON r.negocio_id = n.id
      WHERE r.eliminado_en IS NULL AND r.negocio_id = ?
      ORDER BY r.fecha DESC, r.hora DESC
    `,
      [negocio_id]
    );

    if (reservas.length === 0) {
      return res.status(404).json({
        message: "No se encontraron reservas para este negocio.",
      });
    }

    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

// Reagendar una reserva (cambiar fecha y hora)
const reagendarReserva = async (req, res) => {
  const reservaId = req.params.reservaId;
  const { fecha, hora } = req.body;

  if (!fecha || !hora) {
    return res
      .status(400)
      .json({ error: "Fecha y hora son requeridas para reagendar." });
  }

  try {
    const [result] = await db.execute(
      `UPDATE reservas
       SET fecha = ?, hora = ?
       WHERE id = ? AND eliminado_en IS NULL`,
      [fecha, hora, reservaId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Reserva no encontrada o ya eliminada" });
    }

    res.json({ message: "Reserva reagendada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al reagendar la reserva" });
  }
};

// Eliminar reserva (soft delete)
const eliminarReserva = async (req, res) => {
  const reservaId = req.params.reservaId;

  try {
    const [result] = await db.execute(
      `UPDATE reservas SET eliminado_en = NOW() WHERE id = ? AND eliminado_en IS NULL`,
      [reservaId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Reserva no encontrada o ya eliminada" });
    }

    res.json({ message: "Reserva eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

const cambiarEstadoReserva = async (req, res) => {
  const { reservaId } = req.params;
  const { estado } = req.body;

  const estadosValidos = ["pendiente", "aprobada", "rechazada", "cancelada"];
  if (!estadosValidos.includes(estado.toLowerCase())) {
    return res.status(400).json({ error: "Estado inválido." });
  }

  try {
    const [result] = await db.execute(
      `UPDATE reservas SET estado = ? WHERE id = ? AND eliminado_en IS NULL`,
      [estado, reservaId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }

    res.json({ message: "Estado actualizado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el estado." });
  }
};

const obtenerNombresServiciosPorNegocio = async (req, res) => {
  const { negocioId } = req.params;

  try {
    const [servicios] = await db.execute(
      `SELECT nombre FROM servicios 
       WHERE negocio_id = ? AND eliminado_en IS NULL`,
      [negocioId]
    );

    res.json({ servicios });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los servicios." });
  }
};

module.exports = {
  getConfiguracionNegocio,
  editarNegocio,
  editarConfiguracionPagina,
  agregarRedSocial,
  obtenerInicioDashboard,
  obtenerReservas,
  reagendarReserva,
  eliminarReserva,
  cambiarEstadoReserva,
  obtenerNombresServiciosPorNegocio,
};
