import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [activo, setActivo] = useState(null);

  const togglePregunta = (index) => {
    setActivo(index === activo ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>
          Preguntas Frecuentes | Reservas simples, negocios que crecen
        </title>
        <meta
          name="description"
          content="Respondemos las dudas más comunes sobre nuestra plataforma de reservas y creación de sitios web. Ideal para emprendedores, nuevos usuarios y negocios en crecimiento."
        />
        <meta
          name="keywords"
          content="sistema de reservas online, agenda de turnos para emprendedores, software de reservas fácil de usar, gestión de reservas para servicios, crear sitio web con agenda, reserva de citas para pequeños negocios, plataforma para agendar servicios, app para reservar turnos, herramienta para vender servicios online, agenda online con sitio web incluido"
        />
        <link rel="canonical" href="https://horizo.com/faq" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/faq" />
        <meta
          property="og:title"
          content="Preguntas Frecuentes | Todo lo que necesitás saber sobre nuestra plataforma"
        />
        <meta
          property="og:description"
          content="Despejá tus dudas sobre planes, reservas, funciones y cómo nuestra app puede ayudarte a crecer. Estamos para acompañarte."
        />
        <meta
          property="og:image"
          content="https://horizo.com/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/faq" />
        <meta
          name="twitter:title"
          content="Resolvé tus dudas sobre nuestro sistema de reservas"
        />
        <meta
          name="twitter:description"
          content="Respondemos las preguntas más comunes para que tomes decisiones seguras. Desde cómo funciona hasta qué plan elegir."
        />
        <meta
          name="twitter:image"
          content="https://horizo.com/horizo-original.png"
        />
      </Helmet>

      <Header />

      <main className="flex-1 bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Preguntas frecuentes
          </h1>

          <div className="space-y-4 w-3xl mx-auto">
            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(0)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Cómo funciona la prueba gratuita de 30 días?</span>
                {activo === 0 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 0 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  La prueba gratuita de 30 días te permite usar todas las
                  funciones sin límites y sin necesidad de tarjeta de crédito.
                  Al finalizar, si no elegís un plan, tu cuenta se pausará
                  automáticamente (sin perder tus datos).
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(1)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Qué es una reserva online?</span>
                {activo === 1 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 1 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  Una reserva online es cuando un cliente elige día y hora para
                  un servicio a través de internet, sin necesidad de llamar o
                  enviar mensajes. Todo queda organizado automáticamente en tu
                  agenda.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(2)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Puedo usar el plan gratuito para siempre?</span>
                {activo === 2 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 2 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  ¡Sí! El plan gratuito está disponible sin límite de tiempo.
                  Tiene funciones limitadas, pero te permite operar y recibir
                  reservas sin costo.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(3)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Tengo que instalar algo?</span>
                {activo === 3 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 3 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  No, no hace falta instalar nada. Todo funciona 100% online
                  desde cualquier navegador, en tu compu o celular.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(4)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Qué tan personalizable es la página pública?</span>
                {activo === 4 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 4 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  Podés cambiar los colores, agregar tu logo y editar los
                  enlaces. Es simple y directo, pensado para que cualquier
                  persona lo pueda hacer.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(5)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Se envían recordatorios automáticos?</span>
                {activo === 5 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 5 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  Sí, dependiendo del plan que tengas, podés activar
                  recordatorios por correo electrónico. Vos elegís cuándo y a
                  quién se mandan.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(6)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>
                  ¿Qué pasa con mis datos si dejo de usar la plataforma?
                </span>
                {activo === 6 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 6 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  Podés exportar todos tus datos en cualquier momento. Y si
                  estás inactivo por un año, te avisaremos por correo antes de
                  eliminar la cuenta.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(7)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Sirve para mi tipo de negocio?</span>
                {activo === 7 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 7 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  ¡Claro! Lo usan peluquerías, asesorías, consultorías,
                  estudios, entrevistas, restaurantes y muchos más. Está pensado
                  para cualquier emprendedor.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(8)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Los clientes necesitan cuenta para reservar?</span>
                {activo === 8 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 8 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  No. Tus clientes solo tienen que ingresar sus datos y
                  confirmar con un código que reciben por WhatsApp. Rápido y
                  seguro.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl transition-all">
              <button
                onClick={() => togglePregunta(9)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800"
              >
                <span>¿Puedo usarlo desde el celular?</span>
                {activo === 9 ? (
                  <FaChevronUp className="text-green-600" />
                ) : (
                  <FaChevronDown className="text-green-600" />
                )}
              </button>
              {activo === 9 && (
                <div className="px-5 pb-5 text-gray-600 text-base">
                  ¡Sí! Todo está optimizado para celulares. Vas a poder
                  gestionar tu negocio estés donde estés.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
