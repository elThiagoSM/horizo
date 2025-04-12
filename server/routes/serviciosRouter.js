const express = require("express");
const router = express.Router();

const {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
} = require("../controllers/serviciosController");

router.post("/", crearServicio);
router.get("/:negocio_id", obtenerServicios);
router.get("/detalle/:id", obtenerServicioPorId);
router.put("/:id", actualizarServicio);
router.delete("/:id", eliminarServicio);

module.exports = router;
