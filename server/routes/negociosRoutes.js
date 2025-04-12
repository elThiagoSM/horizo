const express = require("express");
const router = express.Router();
const {
  registrarNegocio,
  tiposNegocios,
  obtenerNegociosPorUsuario,
  getDatosPublicosNegocio,
} = require("../controllers/negociosController");
const upload = require("../middlewares/upload");

router.post("/registro", upload.single("logo"), registrarNegocio);
router.get("/tipos-negocios", tiposNegocios);
router.get("/usuario/:usuarioId", obtenerNegociosPorUsuario);
router.get("/slug_url/:slug_url", getDatosPublicosNegocio);

module.exports = router;
