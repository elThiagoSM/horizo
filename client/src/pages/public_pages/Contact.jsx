import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviado:", formulario);
    setFormulario({
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>Contacto | Reservas simples, negocios que crecen</title>
        <meta
          name="description"
          content="Contactanos para resolver cualquier duda, hacer consultas sobre nuestros servicios, propuestas de colaboración o cualquier otra inquietud. ¡Estamos aquí para ayudarte!"
        />
        <meta
          name="keywords"
          content="sistema de reservas online, agenda de turnos para emprendedores, software de reservas fácil de usar, gestión de reservas para servicios, crear sitio web con agenda, reserva de citas para pequeños negocios, plataforma para agendar servicios, app para reservar turnos, herramienta para vender servicios online, agenda online con sitio web incluido"
        />
        <link rel="canonical" href="https://horizo.com/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/contact" />
        <meta
          property="og:title"
          content="Contáctanos | SaaS de reservas y sitios web"
        />
        <meta
          property="og:description"
          content="¿Tenés alguna duda, propuesta o idea? Contáctanos fácilmente. Queremos ayudarte a hacer crecer tu negocio con nuestro sistema de reservas."
        />
        <meta
          property="og:image"
          content="https://horizo.com/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/contact" />
        <meta
          name="twitter:title"
          content="Contáctanos para resolver tus dudas o hacer una propuesta"
        />
        <meta
          name="twitter:description"
          content="¿Querés saber más sobre nuestro sistema de reservas o tenés una idea para compartir? ¡Hablemos! Estamos aquí para ayudarte."
        />
        <meta
          name="twitter:image"
          content="https://horizo.com/horizo-original.png"
        />
      </Helmet>

      <Header />

      <main className="flex-1 bg-white py-20 px-4">
        <section className="max-w-7xl mx-auto space-y-8">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Contactanos
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-[700px] mx-auto space-y-6 bg-white"
          >
            {/* Grupo: Nombre y Teléfono */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </motion.div>

            {/* Asunto */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                Asunto
              </label>
              <select
                name="asunto"
                value={formulario.asunto}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="" disabled>
                  Seleccioná un asunto
                </option>
                <option value="soporte">Necesito soporte técnico</option>
                <option value="ventas">Consulta sobre planes o precios</option>
                <option value="demo">Solicitar una demo</option>
                <option value="feedback">Quiero dejar una sugerencia</option>
                <option value="bug">Reportar un error en la plataforma</option>
                <option value="integraciones">
                  Consulta sobre integraciones
                </option>
                <option value="cuenta">Problemas con mi cuenta</option>
                <option value="facturacion">Consulta sobre facturación</option>
                <option value="otro">Otro</option>
              </select>
            </motion.div>

            {/* Mensaje */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                required
              ></textarea>
            </motion.div>

            {/* Botón */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
              >
                Enviar mensaje
              </button>
            </motion.div>
          </motion.form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
