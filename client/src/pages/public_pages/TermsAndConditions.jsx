import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* General SEO */}
        <title>
          Términos y Condiciones | Reservas simples, negocios que crecen
        </title>
        <meta
          name="description"
          content="Leé los términos y condiciones del uso de nuestra plataforma. Información clara para que sepas cómo funciona nuestro sistema de reservas y creación de sitios web."
        />
        <meta
          name="keywords"
          content="términos y condiciones, política de uso, uso de plataforma de reservas, condiciones del servicio, reglas del sistema, legal reservas online, uso de sitio web, política de privacidad, normas de uso, SaaS para emprendedores"
        />
        <link rel="canonical" href="https://horizo.com/terms" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horizo.com/terms" />
        <meta
          property="og:title"
          content="Términos y Condiciones | Plataforma de reservas y sitios web"
        />
        <meta
          property="og:description"
          content="Conocé nuestras políticas de uso y condiciones del servicio para utilizar la plataforma de manera segura y clara. Estamos comprometidos con la transparencia."
        />
        <meta
          property="og:image"
          content="https://horizo.com/public/horizo-original.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://horizo.com/terms" />
        <meta
          name="twitter:title"
          content="Términos y Condiciones del servicio | Reservas simples y seguras"
        />
        <meta
          name="twitter:description"
          content="Revisá los términos que rigen el uso de nuestra plataforma. Transparencia para que crezcas con confianza."
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
            Términos y condiciones
          </h1>

          <section className="space-y-6 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Aceptación de los términos
              </h2>
              <p>
                Al utilizar nuestra plataforma, aceptás cumplir con estos
                Términos y Condiciones. Si no estás de acuerdo con alguno de
                ellos, por favor no uses el servicio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Uso de la plataforma
              </h2>
              <p>
                Solo podés usar la plataforma con fines legales y respetando las
                normativas vigentes. No está permitido el uso indebido,
                incluyendo el acceso no autorizado o el intento de dañar el
                sistema.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Cuentas de usuario
              </h2>
              <p>
                Sos responsable de mantener la confidencialidad de tus
                credenciales. Nos reservamos el derecho de suspender o eliminar
                cuentas por actividades sospechosas o fraudulentas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Planes y pagos
              </h2>
              <p>
                Al contratar un plan pago, aceptás las condiciones de
                facturación establecidas. Podés cambiar o cancelar tu plan en
                cualquier momento desde tu panel de cuenta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Propiedad intelectual
              </h2>
              <p>
                Todos los contenidos y elementos visuales de la plataforma son
                propiedad de la empresa o de sus licenciantes, y están
                protegidos por leyes de propiedad intelectual.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Modificaciones
              </h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Los cambios se comunicarán oportunamente y el
                uso continuado implicará la aceptación de los mismos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Contacto
              </h2>
              <p>
                Si tenés dudas o comentarios sobre estos términos, podés
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

export default TermsAndConditions;
