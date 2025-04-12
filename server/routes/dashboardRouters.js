const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/dashboardController");

router.get("/negocios/:negocio_id/configuracion", getConfiguracionNegocio);
router.put("/negocios/:negocio_id", editarNegocio);
router.put(
  "/negocios/:negocio_id/configuracion-pagina",
  editarConfiguracionPagina
);

router.post("/negocios/:negocio_id/redes-sociales", agregarRedSocial);
router.get("/inicio/:negocioId", obtenerInicioDashboard);

router.get("/reservas/:negocio_id/negocios", obtenerReservas);
router.put("/reservas/:reservaId/reagendar", reagendarReserva);
router.delete("/reservas/:reservaId", eliminarReserva);
router.put("/reservas/:reservaId/estado", cambiarEstadoReserva);

router.get("/servicios/:negocioId/nombres", obtenerNombresServiciosPorNegocio);

module.exports = router;
