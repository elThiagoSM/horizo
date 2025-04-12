import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

// Componente reutilizable para enlaces con subrayado animado
const LinkAnimado = ({
  href,
  children,
  className = "",
  barColor = "bg-white",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block transition ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        layout
        className={`absolute left-0 -bottom-1 h-[1.5px] ${barColor} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Primer Div */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 py-10 border-b border-black/15">
          {/* Columna 1 - Logo y descripción */}
          <div>
            <img className="w-32 mb-3" src="/public/horizo-blanco.png"></img>
            <p className="text-white">
              Es una aplicación web de reservas de servicios para múltiples
              empresas que brinda a sus usuarios la capacidad de crear y
              administrar reservas, empleados, servicios, clientes, etc.
            </p>
          </div>

          {/* Columna 2 - Servicios */}
          <div>
            <h2 className="text-base font-semibold mb-3">Servicios</h2>
            <ul className="space-y-2 text-white">
              <li>
                <LinkAnimado href="/plans">Precios</LinkAnimado>
              </li>
              <li>
                <LinkAnimado href="/faq">Preguntas frecuentes</LinkAnimado>
              </li>
              <li>
                <LinkAnimado href="/contact">Contactar</LinkAnimado>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Información legal */}
          <div>
            <h2 className="text-base font-semibold mb-3">Información legal</h2>
            <ul className="space-y-2 text-white">
              <li>
                <LinkAnimado href="/terms">Términos y condiciones</LinkAnimado>
              </li>
              <li>
                <LinkAnimado href="/privacy">
                  Política de privacidad
                </LinkAnimado>
              </li>
              <li>
                <LinkAnimado href="/cookies">Política de cookies</LinkAnimado>
              </li>
              <li>
                <LinkAnimado href="/legal">Aviso legal</LinkAnimado>
              </li>
            </ul>
          </div>
        </div>

        {/* Segundo Div */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start py-8 border-b border-black/15 gap-6">
          {/* Ayuda */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">¿Necesitas ayuda?</h2>
            <p className="text-white text-base">
              Contacta con nuestro equipo de Atención al Cliente
            </p>
            <p className="text-white font-medium mt-1 text-base">
              <a
                href="mailto:info@horizo.com"
                className="underline hover:text-gray-200"
              >
                info@horizo.com
              </a>
            </p>
          </div>

          {/* Redes sociales */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Seguinos en redes</h2>
            <div className="flex space-x-4 mt-2 text-white text-2xl">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="hover:text-gray-200" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="hover:text-gray-200" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="hover:text-gray-200" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="hover:text-gray-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Tercer Div */}
        <div className="text-center py-6 text-white text-sm">
          © 2025 horizo. Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
