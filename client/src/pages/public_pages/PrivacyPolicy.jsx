import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>
          Política de Privacidad | Reservas simples, negocios que crecen
        </title>
        <meta
          name="description"
          content="Conocé cómo protegemos tus datos y qué información recopilamos. Nuestra política de privacidad garantiza transparencia y seguridad para vos y tus clientes."
        />
        <meta
          name="keywords"
          content="política de privacidad, protección de datos, privacidad de usuarios, uso de datos personales, seguridad en plataforma de reservas, privacidad SaaS, privacidad emprendedores, datos en software de reservas"
        />
        <link rel="canonical" href="https://horizo.com/privacy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/privacy" />
        <meta
          property="og:title"
          content="Política de Privacidad | Plataforma de reservas segura"
        />
        <meta
          property="og:description"
          content="Nos tomamos tu privacidad en serio. Leé cómo manejamos y protegemos tu información personal al usar nuestra plataforma."
        />
        <meta
          property="og:image"
          content="https://horizo.com/public/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/privacy" />
        <meta
          name="twitter:title"
          content="Privacidad garantizada | Política de datos de nuestra plataforma"
        />
        <meta
          name="twitter:description"
          content="Transparencia y confianza: revisá cómo usamos y cuidamos tus datos en nuestra app de reservas y creación de sitios web."
        />
        <meta
          name="twitter:image"
          content="https://horizo.com/public/horizo-original.png"
        />
      </Helmet>

      <Header />

      <main className="flex-1 bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Política de privacidad
          </h1>

          <section className="space-y-6 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Información que recopilamos
              </h2>
              <p>
                Recopilamos información personal como tu nombre, correo
                electrónico, número de teléfono y detalles del negocio cuando te
                registrás o usás nuestros servicios.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Uso de la información
              </h2>
              <p>
                Utilizamos tus datos para brindarte un mejor servicio, gestionar
                tu cuenta, enviar notificaciones importantes y mejorar la
                plataforma constantemente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Compartir información
              </h2>
              <p>
                No compartimos tu información personal con terceros, salvo
                cuando sea necesario para brindarte el servicio (por ejemplo,
                herramientas de mensajería) o por requerimientos legales.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Seguridad de los datos
              </h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para
                proteger tus datos. Sin embargo, ningún sistema es 100%
                infalible, por lo que también te recomendamos mantener buenas
                prácticas de seguridad.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Tus derechos
              </h2>
              <p>
                Tenés derecho a acceder, modificar o eliminar tu información
                personal. Podés hacerlo desde tu cuenta o escribiéndonos a
                nuestro correo de soporte.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Cookies y tecnologías similares
              </h2>
              <p>
                Utilizamos cookies para mejorar la experiencia de usuario y
                analizar el uso del sitio. Podés gestionar tus preferencias
                desde tu navegador.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Cambios en esta política
              </h2>
              <p>
                Podemos actualizar esta política en cualquier momento. Te
                notificaremos sobre los cambios más importantes. La versión
                actual siempre estará disponible en nuestro sitio web.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                8. Contacto
              </h2>
              <p>
                Si tenés dudas sobre esta política, escribinos a info@horizo.com
                o usá nuestro formulario de contacto.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
