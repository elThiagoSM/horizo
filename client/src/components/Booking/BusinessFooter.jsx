import React from "react";

const BusinessFooter = () => {
  return (
    <footer className="bg-white py-6">
      <div className="text-center text-gray-600 text-sm">
        © 2025{" "}
        <a
          href="https://tusaas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-gray-400 hover:border-gray-600 transition-colors"
        >
          TuSaaS
        </a>
        . Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default BusinessFooter;
