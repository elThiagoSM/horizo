export default function RestorePassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e0f2fe] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-[#0f172a]">
          Recuperar Contraseña
        </h2>
        <p className="mb-4 text-center text-gray-600">
          Ingresa tu email y te enviaremos un enlace para restablecer tu
          contraseña.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-[#94a3b8] p-3 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white font-semibold transition hover:bg-blue-700"
          >
            Enviar Enlace
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          ¿Recuerdas tu contraseña?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
