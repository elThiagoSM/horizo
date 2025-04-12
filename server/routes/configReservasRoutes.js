const express = require("express");
const router = express.Router();
const {
  crearDiaLaboral,
  actualizarDiaLaboral,
  obtenerDiasLaborales,
  crearFranjaHoraria,
  actualizarFranjaHoraria,
  obtenerFranjasHorarias,
  eliminarFranjaHoraria,
} = require("../controllers/configReservasController");

// 📆 DÍAS LABORALES
router.post("/dias-laborales", crearDiaLaboral);
router.put("/dias-laborales/:id", actualizarDiaLaboral);
router.get("/dias-laborales/:negocio_id", obtenerDiasLaborales);

// 🕐 FRANJAS HORARIAS
router.post("/franjas-horarias", crearFranjaHoraria);
router.put("/franjas-horarias/:id", actualizarFranjaHoraria);
router.get("/franjas-horarias/:dia_laboral_id", obtenerFranjasHorarias);
router.delete("/franjas-horarias/:id", eliminarFranjaHoraria);

module.exports = router;
