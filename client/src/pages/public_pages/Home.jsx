import React, { useRef } from "react";
import {
  FaCalendarAlt,
  FaTools,
  FaRocket,
  FaUsers,
  FaUserPlus,
  FaClock,
  FaListAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 px-4 flex flex-col items-center justify-center bg-white">
        <section className="max-w-7xl w-full pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden">
          <motion.div
            className="space-y-6 text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.h1
              className="text-6xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 12,
                duration: 0.8,
              }}
            >
              El sistema de reservas que es ideal para hacer crecer tu negocio
            </motion.h1>

            <motion.p
              className="text-base font-semibold text-gray-600"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 10,
                duration: 0.7,
                delay: 0.3,
              }}
            >
              Gestioná turnos, clientes y servicios desde un solo lugar. <br />
              Iniciá gratis por 30 días, sin ingresar datos.
            </motion.p>

            <motion.button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-4xl hover:bg-green-700 cursor-pointer"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.5,
              }}
            >
              Empezar ahora gratis
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 10,
              delay: 0.6,
            }}
          >
            <img
              src="https://reserva-online.com/uploads/medium/ef9d3ce4a9179103939d839e90c3b275_medium-626x626.png"
              alt="Reservas online"
              className="w-full h-auto"
            />
          </motion.div>
        </section>

        <section className="bg-white py-16">
          <motion.div
            className="max-w-7xl mx-auto text-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-12 text-center"
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 12,
                duration: 0.8,
                delay: 0.3,
              }}
            >
              Una plataforma pensada para ayudarte a lanzar y <br /> escalar tu
              negocio con reservas online
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  duration: 0.7,
                  delay: 0.3,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaCalendarAlt className="text-green-600 text-3xl" />
                <h3 className="text-lg font-bold text-gray-900">
                  Calendario intuitivo
                </h3>
                <p className="text-sm text-gray-600">
                  Visualizá y gestioná reservas fácilmente con un calendario
                  claro y dinámico.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  duration: 0.7,
                  delay: 0.5,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaTools className="text-green-600 text-3xl" />
                <h3 className="text-lg font-bold text-gray-900">
                  Totalmente personalizable
                </h3>
                <p className="text-sm text-gray-600">
                  Adaptá servicios, horarios, duración y precios según tu
                  negocio.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  duration: 0.7,
                  delay: 0.7,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaRocket className="text-green-600 text-3xl" />
                <h3 className="text-lg font-bold text-gray-900">
                  Listo para despegar
                </h3>
                <p className="text-sm text-gray-600">
                  Empezá en minutos sin conocimientos técnicos. Todo lo que
                  necesitás, en un clic.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  duration: 0.7,
                  delay: 0.9,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaUsers className="text-green-600 text-3xl" />
                <h3 className="text-lg font-bold text-gray-900">
                  Gestión de clientes
                </h3>
                <p className="text-sm text-gray-600">
                  Accedé al historial de reservas, contactalos y mejorá su
                  experiencia.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="bg-white py-16 w-full max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              ¿Cómo funciona?
            </h2>

            <VerticalTimeline lineColor="#00a63e">
              <VerticalTimelineElement
                icon={<FaUserPlus />}
                iconStyle={{
                  background: "#00a63e",
                  color: "#fff",
                }}
                contentStyle={{
                  background: "#ffffff",
                  color: "#333",
                  padding: "0",
                  boxShadow: "none",
                  borderRadius: "0.75rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid #e5e7eb" }}
              >
                <div className="bg-green-600 h-2 rounded-t-md" />
                <div className="p-6 border border-gray-200 rounded-b-md">
                  <h3 className="text-xl font-bold text-gray-800">
                    Crea tu cuenta
                  </h3>
                  <p className="text-sm text-gray-700">
                    Registrate en nuestra plataforma en menos de 2 minutos.
                    Accedé desde cualquier dispositivo y empezá sin compromiso.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Gratis
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Fácil
                    </span>
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                icon={<FaClock />}
                iconStyle={{ background: "#00a63e", color: "#fff" }}
                contentStyle={{
                  background: "#ffffff",
                  color: "#333",
                  padding: "0",
                  boxShadow: "none",
                  borderRadius: "0.75rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid #e5e7eb" }}
              >
                <div className="bg-green-600 h-2 rounded-t-md" />
                <div className="p-6 border border-gray-200 rounded-b-md">
                  <h3 className="text-xl font-bold text-gray-800">
                    Configurá tu horario
                  </h3>
                  <p className="text-sm text-gray-700">
                    Elegí qué días y horarios estás disponible. Tenés control
                    total sobre tu agenda, con bloqueos personalizados.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Flexible
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      A tu ritmo
                    </span>
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                icon={<FaListAlt />}
                iconStyle={{ background: "#00a63e", color: "#fff" }}
                contentStyle={{
                  background: "#ffffff",
                  color: "#333",
                  padding: "0",
                  boxShadow: "none",
                  borderRadius: "0.75rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid #e5e7eb" }}
              >
                <div className="bg-green-600 h-2 rounded-t-md" />
                <div className="p-6 border border-gray-200 rounded-b-md">
                  <h3 className="text-xl font-bold text-gray-800">
                    Creá tus servicios
                  </h3>
                  <p className="text-sm text-gray-700">
                    Agregá cada servicio que ofrecés, con precios, duración y
                    descripciones. Organizá tu catálogo a tu manera.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 bg-pink-100 text-pink-800 rounded-full">
                      Organizado
                    </span>
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      A medida
                    </span>
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                icon={<FaCheckCircle />}
                iconStyle={{ background: "#00a63e", color: "#fff" }}
                contentStyle={{
                  background: "#ffffff",
                  color: "#333",
                  padding: "0",
                  boxShadow: "none",
                  borderRadius: "0.75rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid #e5e7eb" }}
              >
                <div className="bg-green-600 h-2 rounded-t-md" />
                <div className="p-6 border border-gray-200 rounded-b-md">
                  <h3 className="text-xl font-bold text-gray-800">
                    Recibí reservas
                  </h3>
                  <p className="text-sm text-gray-700">
                    Compartí tu link personalizado y empezá a recibir turnos sin
                    complicaciones. Todo se actualiza en tiempo real.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
                      Automático
                    </span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      Sin esfuerzo
                    </span>
                  </div>
                </div>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </section>

        <section className="bg-white py-16 w-full max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto space-y-28">
            {/* BLOQUE 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <motion.img
                src="https://placehold.co/600x450"
                alt="Ejemplo 1"
                className="w-full h-auto rounded-xl"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 12,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              />
              <div className="text-center md:text-left space-y-5">
                <motion.h3
                  className="text-4xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                >
                  Todo en un solo lugar
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  Organizá tus turnos, gestioná clientes y configurá servicios
                  desde un solo panel intuitivo. Ahorrá tiempo y ganá control
                  total de tu negocio sin complicaciones.
                </motion.p>
              </div>
            </div>

            {/* BLOQUE 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:flex-row-reverse">
              <div className="text-center md:text-left space-y-5">
                <motion.h3
                  className="text-4xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                >
                  Diseño personalizado
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  Elegí colores, subí tu logo, personalizá botones y mensajes.
                  Tu presencia online va a reflejar exactamente quién sos y qué
                  hacés.
                </motion.p>
              </div>
              <motion.img
                src="https://placehold.co/600x450"
                alt="Ejemplo 2"
                className="w-full h-auto rounded-xl"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 12,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              />
            </div>

            {/* BLOQUE 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <motion.img
                src="https://placehold.co/600x450"
                alt="Ejemplo 3"
                className="w-full h-auto rounded-xl"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 12,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              />
              <div className="text-center md:text-left space-y-5">
                <motion.h3
                  className="text-4xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                >
                  Ahorro de tiempo
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  Automatizá las reservas, recibí notificaciones y dejá que la
                  plataforma se encargue por vos. Enfocate en lo que realmente
                  importa: tus clientes.
                </motion.p>
              </div>
            </div>

            {/* BLOQUE 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:flex-row-reverse">
              <div className="text-center md:text-left space-y-5">
                <motion.h3
                  className="text-4xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                >
                  Disponibilidad 24/7
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 12,
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  Tus clientes pueden reservar en cualquier momento del día,
                  incluso cuando dormís. Estás disponible todo el tiempo sin
                  tener que estarlo.
                </motion.p>
              </div>
              <motion.img
                src="https://placehold.co/600x450"
                alt="Ejemplo 4"
                className="w-full h-auto rounded-xl"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 12,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 w-full max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h2
              className="text-4xl font-bold text-green-600"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 12,
                duration: 0.8,
              }}
              viewport={{ once: true }}
            >
              ¿Listo para ganar más clientes con solo unos clics?
            </motion.h2>

            <motion.p
              className="text-lg font-semibold text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 12,
                duration: 0.8,
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              Activá tu sistema de reservas online en minutos y comenzá a
              recibir turnos sin esfuerzo. Ahorrá tiempo, organizá tu agenda y
              permití que tu negocio crezca con una plataforma sencilla y
              automatizada.
            </motion.p>

            <motion.button
              className="mt-4 px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 0.6,
                delay: 0.4,
              }}
              viewport={{ once: true }}
            >
              ¡Empieza ahora mismo!
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
