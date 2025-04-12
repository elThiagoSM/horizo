import { useState } from "react";
import SocialModal from "./SocialModal";

export default function SocialInputs({
  socialLinks,
  updateSocialLink,
  socialIcons,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const openModal = (platform) => {
    setSelectedPlatform(platform);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlatform(null);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-4">Redes Sociales</h3>
      <div className="flex  justify-between">
        {Object.keys(socialLinks).map((platform) => {
          const hasLink = !!socialLinks[platform];
          return (
            <div
              key={platform}
              onClick={() => openModal(platform)}
              className={`cursor-pointer text-3xl transition-colors ${
                hasLink ? "text-green-500" : "text-red-500"
              }`}
            >
              {socialIcons[platform]}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <SocialModal
          platform={selectedPlatform}
          value={socialLinks[selectedPlatform]}
          onClose={closeModal}
          onSave={(newValue) => {
            updateSocialLink(selectedPlatform, newValue);
            closeModal();
          }}
        />
      )}
    </div>
  );
}
