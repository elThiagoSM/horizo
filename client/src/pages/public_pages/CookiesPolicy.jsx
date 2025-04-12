import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>
          Política de Cookies | Reservas simples, negocios que crecen
        </title>
        <meta
          name="description"
          content="Conocé cómo usamos cookies para mejorar tu experiencia en nuestra plataforma. Te explicamos qué datos se recogen, con qué fines y cómo podés gestionarlos."
        />
        <meta
          name="keywords"
          content="política de cookies, uso de cookies, cookies en plataforma, cookies SaaS, privacidad y cookies, consentimiento de cookies, configuración de cookies, experiencia personalizada"
        />
        <link rel="canonical" href="https://horizo.com/cookies" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/cookies" />
        <meta
          property="og:title"
          content="Política de Cookies | Cómo usamos datos para mejorar tu experiencia"
        />
        <meta
          property="og:description"
          content="Informate sobre el uso de cookies en nuestra plataforma: tipos de cookies, propósito y cómo desactivarlas si lo deseás. Queremos ser transparentes."
        />
        <meta
          property="og:image"
          content="https://horizo.com/public/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/cookies" />
        <meta
          name="twitter:title"
          content="Uso de Cookies | Política clara y transparente"
        />
        <meta
          name="twitter:description"
          content="Descubrí cómo utilizamos cookies para ofrecerte una experiencia más fluida y segura. Controlá tus preferencias fácilmente."
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
            Política de cookies
          </h1>

          <section className="space-y-6 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en
                tu navegador cuando visitás un sitio web. Sirven para recordar
                tus preferencias, mejorar la experiencia de navegación y
                recopilar información anónima sobre el uso del sitio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. ¿Qué tipo de cookies utilizamos?
              </h2>
              <p>
                Utilizamos cookies esenciales para el funcionamiento del sitio,
                cookies de análisis para entender cómo se usa la plataforma y
                cookies de personalización para recordar tus preferencias.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Cookies de terceros
              </h2>
              <p>
                También podemos usar cookies de servicios de terceros como
                Google Analytics para analizar el comportamiento de navegación.
                Estas cookies son gestionadas por terceros y están sujetas a sus
                propias políticas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. ¿Cómo podés gestionar las cookies?
              </h2>
              <p>
                Podés aceptar o rechazar el uso de cookies desde el banner
                inicial o desde la configuración de tu navegador. Tené en cuenta
                que desactivar algunas cookies puede afectar el funcionamiento
                del sitio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Cambios en esta política
              </h2>
              <p>
                Podemos modificar esta política de cookies en cualquier momento.
                Te recomendamos revisarla periódicamente para estar informado
                sobre cómo usamos las cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Contacto
              </h2>
              <p>
                Si tenés preguntas sobre nuestra política de cookies, escribinos
                a info@horizo.com o completá el formulario de contacto.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
