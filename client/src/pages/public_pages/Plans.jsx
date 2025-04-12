import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const plans = [
  {
    name: "Gratuito",
    price: "0",
    description:
      "Probá la plataforma sin costos. Ideal para quienes están comenzando.",
    recommended: false,
    features: [
      { text: "URL personalizada (tusitio.com/tu-negocio)", included: true },
      { text: "20 reservas por día", included: true },
      { text: "50 reservas por semana", included: true },
      { text: "100 reservas por mes", included: true },
      { text: "Recordatorios automáticos por email", included: true },
      { text: "Integración con WhatsApp", included: false },
      { text: "Página web personalizada", included: false },
      { text: "Integración con calendarios", included: false },
      { text: "Soporte prioritario", included: false },
    ],
  },
  {
    name: "Pro",
    price: "7.99",
    description:
      "La mejor opción para negocios que crecen y quieren dar una imagen profesional.",
    recommended: true,
    features: [
      { text: "Página web personalizada", included: true },
      { text: "URL personalizada (tusitio.com/tu-negocio)", included: true },
      { text: "40 reservas por día", included: true },
      { text: "100 reservas por semana", included: true },
      { text: "200 reservas por mes", included: true },
      { text: "Recordatorios automáticos por email", included: true },
      { text: "Integración con WhatsApp", included: true },
      { text: "Integración con calendarios", included: true },
      { text: "Soporte estándar", included: true },
      { text: "Soporte prioritario", included: false },
    ],
  },
  {
    name: "Premium",
    price: "14.99",
    description:
      "Para negocios establecidos que necesitan lo mejor, sin límites.",
    recommended: false,
    features: [
      { text: "Página web personalizada", included: true },
      { text: "URL personalizada (tusitio.com/tu-negocio)", included: true },
      { text: "Reservas ilimitadas", included: true },
      { text: "Recordatorios automáticos por email", included: true },
      { text: "Integración con WhatsApp", included: true },
      { text: "Integración con calendarios", included: true },
      { text: "Soporte prioritario 24/7", included: true },
    ],
  },
];

export default function Plans() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>Planes | Reservas simples, negocios que crecen</title>
        <meta
          name="description"
          content="Descubrí nuestros planes de suscripción: gratuito, Pro y Premium. Gestioná reservas y creá tu web en minutos. Ideal para emprendedores y pequeños negocios."
        />
        <meta
          name="keywords"
          content="sistema de reservas online, agenda de turnos para emprendedores, software de reservas fácil de usar, gestión de reservas para servicios, crear sitio web con agenda, reserva de citas para pequeños negocios, plataforma para agendar servicios, app para reservar turnos, herramienta para vender servicios online, agenda online con sitio web incluido"
        />
        <link rel="canonical" href="https://horizo.com/plans" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/plans" />
        <meta
          property="og:title"
          content="Planes para tu negocio | SaaS de reservas y sitio web incluido"
        />
        <meta
          property="og:description"
          content="Empezá gratis o elegí un plan Pro o Premium. Reservas simples, imagen profesional, sin complicaciones. Ideal para negocios que quieren crecer."
        />
        <meta
          property="og:image"
          content="https://horizo.com/public/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/plans" />
        <meta
          name="twitter:title"
          content="Elegí el mejor plan para tu negocio"
        />
        <meta
          name="twitter:description"
          content="Reservas fáciles, sitio web incluido y planes pensados para cada etapa de tu negocio. Empezá gratis hoy."
        />
        <meta
          name="twitter:image"
          content="https://horizo.com/public/horizo-original.png"
        />
      </Helmet>

      <Header />
      <main className="flex-1 px-4 py-16 bg-white">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Elegí el plan ideal para tu negocio
            </motion.h1>
            <motion.p
              className="text-base text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Sin contratos. Sin complicaciones. Empezá gratis y actualizá
              cuando lo necesites.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const sortedFeatures = [
                ...plan.features.filter((f) => f.included),
                ...plan.features.filter((f) => !f.included),
              ];

              const borderClasses = plan.recommended
                ? "border-2 border-green-600"
                : "border border-gray-200";

              const sizeClasses = plan.recommended
                ? "scale-[1.05] lg:scale-[1.07]"
                : "";

              const buttonBase =
                "w-full py-2 rounded-xl font-medium transition cursor-pointer";
              const buttonClasses = plan.recommended
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800";

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: i * 0.2,
                      type: "spring",
                      bounce: 0.3,
                    },
                  }}
                  viewport={{ once: true }}
                  className={`rounded-2xl p-6 bg-white relative ${borderClasses} ${sizeClasses}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="w-4 h-4" /> Recomendado
                    </div>
                  )}

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-1">
                    {plan.name}
                  </h2>
                  <p className="text-gray-500 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-6">
                    {plan.price === "0" ? "Gratis" : `$${plan.price}/mes`}
                  </div>

                  <ul className="space-y-3 mb-6 text-sm">
                    {sortedFeatures.map((feature) => (
                      <li
                        key={feature.text}
                        className={`flex items-center ${
                          feature.included
                            ? "text-gray-700"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        {feature.included ? (
                          <FaCheck className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <FaTimes className="w-4 h-4 text-red-400 mr-2" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${buttonBase} ${buttonClasses}`}
                  >
                    {plan.price === "0"
                      ? "Comenzar gratis"
                      : "Elegir este plan"}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
