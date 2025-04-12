import React, { useState, useRef, useLayoutEffect } from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/plans", label: "Planes" },
  { href: "/functions", label: "Funciones" },
  { href: "/faq", label: "Preguntas Frecuentes" },
  { href: "/contact", label: "Contacto" },
];

const NavLinkAnimado = ({ href, label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-base font-medium text-gray-600 hover:text-green-600 transition"
    >
      {label}
      <motion.div
        layout
        className="absolute left-0 -bottom-1 h-[2.5px] bg-green-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </a>
  );
};

const Header = () => {
  const [activeButton, setActiveButton] = useState("register");
  const [bgProps, setBgProps] = useState({ left: 0, width: 0 });

  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const containerRef = useRef(null);

  // Medir y ajustar el fondo al botón activo
  useLayoutEffect(() => {
    const loginRect = loginRef.current.getBoundingClientRect();
    const registerRect = registerRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const targetRect = activeButton === "login" ? loginRect : registerRect;

    setBgProps({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
    });
  }, [activeButton]);

  return (
    <header className="w-full px-6 py-6 bg-white flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between relative">
        <img className="w-32" src="/horizo-original.png"></img>

        <nav className="flex gap-6">
          {navItems.map((item) => (
            <NavLinkAnimado
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}
        </nav>

        {/* Botones */}
        <div
          ref={containerRef}
          className="relative flex items-center gap-4"
          onMouseLeave={() => setActiveButton("register")}
        >
          {/* Fondo animado */}
          <motion.div
            layout
            layoutId="hoverBg"
            className="absolute h-9 rounded-md bg-green-600 z-0"
            animate={{
              left: bgProps.left,
              width: bgProps.width,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />

          {/* Iniciar sesión */}
          <motion.button
            ref={loginRef}
            onMouseEnter={() => setActiveButton("login")}
            className="relative z-10 flex items-center gap-1 text-sm px-4 py-1.5 rounded-md cursor-pointer"
            animate={{
              color: activeButton === "login" ? "#ffffff" : "#4B5563",
            }}
            transition={{ duration: 0.3 }}
          >
            <FiUser className="text-lg" />
            <span>Iniciar sesión</span>
          </motion.button>

          {/* Registrarse */}
          <motion.button
            ref={registerRef}
            onMouseEnter={() => setActiveButton("register")}
            className="relative z-10 text-sm px-4 py-1.5 rounded-md cursor-pointer"
            animate={{
              color: activeButton === "register" ? "#ffffff" : "#4B5563",
            }}
            transition={{ duration: 0.3 }}
          >
            Registrarse
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
