import { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

import ColorPresets from "./ColorPresets";
import ImageUploader from "./ImageUploader";
import TextInputs from "./TextInputs";
import ColorPickers from "./ColorPickers";
import SocialInputs from "./SocialInputs";
import ButtonList from "./ButtonList";
import Preview from "./Preview";

export default function BusinessPageBuilder() {
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [buttonColor, setButtonColor] = useState("#FFFFFF");
  const [buttons, setButtons] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    Instagram: "",
    Facebook: "",
    Twitter: "",
    LinkedIn: "",
    Youtube: "",
    Whatsapp: "",
    Tiktok: "",
  });
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const showWatermark = true;
  const canEditColors = false;
  const buttonLimit = 6;

  const socialIcons = {
    Instagram: <FaInstagram />,
    Facebook: <FaFacebook />,
    Twitter: <FaTwitter />,
    LinkedIn: <FaLinkedin />,
    Youtube: <FaYoutube />,
    Whatsapp: <FaWhatsapp />,
    Tiktok: <FaTiktok />,
  };

  const socialBaseUrls = {
    Instagram: "https://instagram.com/",
    Facebook: "https://facebook.com/",
    Twitter: "https://twitter.com/",
    LinkedIn: "https://linkedin.com/in/",
    Youtube: "https://youtube.com/",
    Whatsapp: "https://we.me/",
    Tiktok: "https://tiktok.com/@",
  };

  const colorPresets = [
    {
      name: "Classic Blue",
      primary: "#0D6EFD",
      text: "#FFFFFF",
      button: "#084298",
    },
    {
      name: "Sunset Orange",
      primary: "#FF6B6B",
      text: "#FFFFFF",
      button: "#C94444",
    },
    {
      name: "Forest Green",
      primary: "#2F855A",
      text: "#FFFFFF",
      button: "#276749",
    },
    {
      name: "Royal Purple",
      primary: "#6B46C1",
      text: "#FFFFFF",
      button: "#553C9A",
    },
    {
      name: "Dark Mode",
      primary: "#1A202C",
      text: "#E2E8F0",
      button: "#2D3748",
    },
    {
      name: "Soft Pink",
      primary: "#FBB6CE",
      text: "#1A202C",
      button: "#F687B3",
    },
    {
      name: "Ocean Teal",
      primary: "#319795",
      text: "#FFFFFF",
      button: "#2C7A7B",
    },
    {
      name: "Warm Yellow",
      primary: "#F6E05E",
      text: "#1A202C",
      button: "#D69E2E",
    },
  ];

  const applyPreset = (preset) => {
    setPrimaryColor(preset.primary);
    setTextColor(preset.text);
    setButtonColor(preset.button);
  };

  const formatLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`;
    }
    return link;
  };

  const addButton = () => setButtons([...buttons, { title: "", link: "" }]);
  const removeButton = (index) =>
    setButtons(buttons.filter((_, i) => i !== index));
  const updateButton = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;
    setButtons(newButtons);
  };

  const updateSocialLink = (platform, value) =>
    setSocialLinks({ ...socialLinks, [platform]: value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Configuración</h2>

        <ColorPresets presets={colorPresets} applyPreset={applyPreset} />
        <ImageUploader handleImageUpload={handleImageUpload} />
        <TextInputs
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <ColorPickers
          primaryColor={primaryColor}
          textColor={textColor}
          buttonColor={buttonColor}
          setPrimaryColor={setPrimaryColor}
          setTextColor={setTextColor}
          setButtonColor={setButtonColor}
          canEditColors={canEditColors}
        />
        <SocialInputs
          socialLinks={socialLinks}
          updateSocialLink={updateSocialLink}
          socialIcons={socialIcons}
        />
        <ButtonList
          buttons={buttons}
          addButton={addButton}
          removeButton={removeButton}
          updateButton={updateButton}
          buttonLimit={buttonLimit}
        />

        <div className="w-full flex justify-between text-white">
          <button
            className="px-14 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            type="button"
          >
            Guardar
          </button>
          <button
            className="px-14 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>

      <Preview
        image={image}
        title={title}
        description={description}
        buttons={buttons}
        socialLinks={socialLinks}
        socialIcons={socialIcons}
        socialBaseUrls={socialBaseUrls}
        primaryColor={primaryColor}
        textColor={textColor}
        buttonColor={buttonColor}
        formatLink={formatLink}
        showWatermark={showWatermark}
      />
    </div>
  );
}
