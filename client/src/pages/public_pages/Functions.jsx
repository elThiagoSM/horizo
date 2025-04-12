import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaClock,
  FaListUl,
  FaFileExport,
  FaMobileAlt,
  FaCogs,
  FaChartLine,
  FaUsers,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

const Functions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>
          Funciones del sistema | Reservas simples, negocios que crecen
        </title>
        <meta
          name="description"
          content="Descubrí todo lo que podés hacer con nuestra plataforma: gestión de reservas, sitio web incluido, atención 24/7, personalización total y más. Ideal para emprendedores y pequeños negocios."
        />
        <meta
          name="keywords"
          content="sistema de reservas online, agenda de turnos para emprendedores, software de reservas fácil de usar, gestión de reservas para servicios, crear sitio web con agenda, reserva de citas para pequeños negocios, plataforma para agendar servicios, app para reservar turnos, herramienta para vender servicios online, agenda online con sitio web incluido"
        />
        <link rel="canonical" href="https://horizo.com/functions" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/functions" />
        <meta
          property="og:title"
          content="Todo lo que podés hacer con nuestra plataforma | Sistema para reservas y páginas web"
        />
        <meta
          property="og:description"
          content="Explorá todas las funciones: reservas 24/7, agenda personalizable, sitio web, atención al cliente y más. Creá una experiencia profesional para tus clientes."
        />
        <meta
          property="og:image"
          content="https://horizo.com/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/functions" />
        <meta
          name="twitter:title"
          content="Conocé las funciones del sistema | Reservas simples, negocios que crecen"
        />
        <meta
          name="twitter:description"
          content="Nuestro software te da todo para que tu negocio crezca: agenda, sitio web, reservas fáciles y más. Descubrí cómo funciona."
        />
        <meta
          name="twitter:image"
          content="https://horizo.com/horizo-original.png"
        />
      </Helmet>

      <Header />

      <main className="flex-1 bg-white py-16 px-6">
        <section className="max-w-7xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Todo lo que necesitás en un solo lugar
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-base text-gray-600 max-w-2xl mx-auto"
          >
            Nuestro sistema fue creado pensando en vos, que estás haciendo
            crecer tu negocio. Estas son algunas de las cosas que podés hacer
            con el 👇
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaClock className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Control de horarios
              </h3>
              <p className="text-sm text-gray-600">
                Establecé tu disponibilidad, bloqueá franjas horarias y organizá
                tu agenda como quieras.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaListUl className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Servicios personalizados
              </h3>
              <p className="text-sm text-gray-600">
                Creá servicios con duración, precio y descripciones a tu medida.
                ¡Sos vos quien manda!
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaFileExport className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Exportación de datos
              </h3>
              <p className="text-sm text-gray-600">
                Llevate tu info cuando quieras. Descargá tus reservas, clientes
                o servicios en CSV.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaChartLine className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Estadísticas en tiempo real
              </h3>
              <p className="text-sm text-gray-600">
                Seguimiento visual de tus reservas, clientes y actividad para
                tomar mejores decisiones.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaUsers className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Gestión de clientes
              </h3>
              <p className="text-sm text-gray-600">
                Accedé al historial de cada cliente, contactalos y fortalecé tu
                relación con ellos.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaCalendarCheck className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Reservas automáticas
              </h3>
              <p className="text-sm text-gray-600">
                Tus clientes reservan y tu agenda se actualiza sola. ¡Como
                magia, pero real!
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaMobileAlt className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Diseño responsive
              </h3>
              <p className="text-sm text-gray-600">
                Funciona en cualquier dispositivo. Reservá o gestioná desde el
                celu, tablet o compu.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaCogs className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Configuración flexible
              </h3>
              <p className="text-sm text-gray-600">
                Botones, colores, mensajes... armá tu página pública como
                quieras y mostrá tu estilo.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.9 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center space-y-4"
            >
              <FaShieldAlt className="text-green-600 text-4xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Seguridad y privacidad
              </h3>
              <p className="text-sm text-gray-600">
                Tus datos están protegidos. Usamos tecnología segura para que
                solo vos tengas el control.
              </p>
            </motion.div>
          </div>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 1 }}
            viewport={{ once: true }}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 cursor-pointer"
          >
            Probalo gratis por 30 días
          </motion.button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Functions;
