import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>Aviso Legal | Reservas simples, negocios que crecen</title>
        <meta
          name="description"
          content="Información legal sobre la titularidad del sitio, responsabilidades y derechos. Conocé los detalles legales de nuestra plataforma de reservas y sitios web."
        />
        <meta
          name="keywords"
          content="aviso legal, información legal, titular del sitio, derechos de autor, responsabilidad legal, condiciones legales plataforma, SaaS legal, legal reservas online, cumplimiento legal"
        />
        <link rel="canonical" href="https://horizo.com/legal" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/legal" />
        <meta
          property="og:title"
          content="Aviso Legal | Información sobre la titularidad y condiciones del sitio"
        />
        <meta
          property="og:description"
          content="Accedé a la información legal sobre nuestro sitio, titularidad, derechos, responsabilidades y cumplimiento normativo."
        />
        <meta
          property="og:image"
          content="https://horizo.com/public/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/legal" />
        <meta
          name="twitter:title"
          content="Aviso Legal de la plataforma | Información y responsabilidades"
        />
        <meta
          name="twitter:description"
          content="Conocé los datos legales y de responsabilidad sobre nuestra plataforma de reservas y creación de sitios web. Cumplimos con las normativas vigentes."
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
            Aviso legal
          </h1>

          <section className="space-y-6 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Información general
              </h2>
              <p>
                Este sitio web es operado por Thiago Silveira Machado. Al
                acceder y utilizar este sitio, aceptás las condiciones
                establecidas en este aviso legal.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Propiedad intelectual
              </h2>
              <p>
                Todos los contenidos, diseños, textos, imágenes, logos y
                software son propiedad de{" "}
                <span className="font-bold">horizo</span> o de terceros que han
                autorizado su uso, y están protegidos por derechos de propiedad
                intelectual. Está prohibida su reproducción o distribución sin
                autorización.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Responsabilidad del uso
              </h2>
              <p>
                El uso del sitio es responsabilidad exclusiva del usuario. No
                nos hacemos responsables de posibles daños derivados del acceso
                o mal uso del contenido del sitio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Enlaces a terceros
              </h2>
              <p>
                Este sitio puede incluir enlaces a páginas externas sobre las
                que no tenemos control. No nos responsabilizamos por el
                contenido ni por la disponibilidad de dichos sitios.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Legislación aplicable
              </h2>
              <p>
                Este aviso legal se rige por las leyes vigentes en Uruguay.
                Cualquier disputa será sometida a los tribunales competentes de
                dicha jurisdicción.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Contacto
              </h2>
              <p>
                Para cualquier consulta relacionada con este aviso legal, podés
                escribirnos a info@horizo.com o usar nuestro formulario de
                contacto.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNotice;
