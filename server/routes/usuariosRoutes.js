const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  verificarCodigo,
  loginUsuario,
} = require("../controllers/usuariosController");

router.post("/registro", registrarUsuario);
router.post("/verificar", verificarCodigo);
router.post("/login", loginUsuario);

module.exports = router;
