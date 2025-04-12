const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const usuariosRoutes = require("./routes/usuariosRoutes");
const negociosRoutes = require("./routes/negociosRoutes");
const configReservasRoutes = require("./routes/configReservasRoutes");
const serviciosRouter = require("./routes/serviciosRouter");
const dashboardRouters = require("./routes/dashboardRouters");

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/negocios", negociosRoutes);
app.use("/api/config-reservas", configReservasRoutes);
app.use("/api/servicios", serviciosRouter);
app.use("/api/dashboard", dashboardRouters);

// DB connection
require("./db/connection");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
