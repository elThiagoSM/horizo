import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

export default function Preview({
  image,
  title,
  description,
  buttons,
  socialLinks,
  socialIcons,
  socialBaseUrls,
  primaryColor,
  textColor,
  buttonColor,
  formatLink,
  showWatermark,
}) {
  const getContrastingTextColor = (bgColor) =>
    tinycolor(bgColor).isLight() ? "#111827" : "#F9FAFB";

  return (
    <div
      className="w-full md:w-2/3 flex items-center justify-center"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-lg text-center p-6 rounded-md"
        style={{ color: getContrastingTextColor(primaryColor) }}
      >
        {image ? (
          <div className="mb-4">
            <img
              src={image}
              alt="Vista previa"
              className="max-w-full max-h-28 mx-auto rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4 text-sm italic opacity-50">
            Sube una imagen para tu página
          </div>
        )}

        <div className="flex flex-col justify-center gap-1 mb-8">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}

          {description && <p className="text-sm opacity-75">{description}</p>}
        </div>

        {buttons.length > 0 ? (
          buttons.map((button, index) => (
            <motion.a
              key={index}
              href={formatLink(button.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 my-3 rounded-xl text-lg font-medium shadow-md "
              style={{ backgroundColor: buttonColor, color: textColor }}
              whileHover={{ scale: 1.05 }}
            >
              {button.title || "Botón"}
            </motion.a>
          ))
        ) : (
          <p className="text-sm opacity-75">Aquí aparecerán tus botones</p>
        )}

        <div className="flex justify-center gap-4 mt-8">
          {Object.keys(socialLinks).map(
            (platform) =>
              socialLinks[platform] && (
                <motion.a whileHover={{ scale: 1.2 }}>
                  <a
                    key={platform}
                    href={`${socialBaseUrls[platform]}${socialLinks[platform]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl"
                  >
                    {socialIcons[platform]}
                  </a>
                </motion.a>
              )
          )}
        </div>

        {showWatermark && (
          <div className="fixed bottom-4 right-4 text-xs text-gray-300 opacity-70">
            Hecho con{" "}
            <a
              href="https://tusaaS.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline"
            >
              TuSaaS
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
