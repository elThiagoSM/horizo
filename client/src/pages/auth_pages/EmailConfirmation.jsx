import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmailConfirmation() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef([]);
  const location = useLocation();
  const email = location.state?.email || "";

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setSuccess(false);
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setMensaje("Por favor ingresa los 6 dígitos del código.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/usuarios/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: fullCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMensaje(data.error || "Código incorrecto.");
      } else {
        setSuccess(true);
        setMensaje("¡Correo confirmado con éxito!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setMensaje("Error al conectar con el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
          Confirmar Correo Electrónico
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Ingresá el código de 6 dígitos que te enviamos por email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs del código */}
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => {
                  e.preventDefault();
                  const paste = e.clipboardData
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  if (paste.length === 0) return;

                  const newCode = [...code];
                  for (let i = 0; i < paste.length; i++) {
                    if (index + i < 6) {
                      newCode[index + i] = paste[i];
                    }
                  }
                  setCode(newCode);
                  const nextIndex = index + paste.length - 1;
                  inputsRef.current[Math.min(nextIndex + 1, 5)]?.focus();
                }}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 rounded-md border border-gray-300 text-center text-lg font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            ))}
          </div>

          {/* Botón de enviar */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-md shadow"
            >
              Confirmar Código
            </button>
          </div>

          {/* Mensaje */}
          {mensaje && (
            <p
              className={`text-center text-sm font-medium ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {mensaje}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No recibiste el código?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Reenviar código
          </a>
        </p>
      </div>
    </div>
  );
}
