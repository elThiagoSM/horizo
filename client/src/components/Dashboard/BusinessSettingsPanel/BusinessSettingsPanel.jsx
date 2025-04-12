import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessInfoForm from "./BusinessInfoForm";
import PageConfigurationForm from "./PageConfigurationForm";
import SocialMediaForm from "./SocialMediaForm";

const BusinessSettingsPanel = () => {
  const negocioId = localStorage.getItem("negocioId");

  const [business, setBusiness] = useState({
    nombre: "",
    descripcion: "",
    eslogan: "",
    slug_url: "",
    tipo_negocio_id: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    pais: "",
    logo_url: "",
  });

  const [pageConfig, setPageConfig] = useState({
    paleta_color_id: "",
    mostrar_marca_agua: true,
    colores_personalizados_activados: false,
    color_personalizado_primario: "",
    color_personalizado_texto: "",
    color_personalizado_boton: "",
  });

  const [social, setSocial] = useState({ plataforma: "", enlace: "" });
  const [colorPalettes, setColorPalettes] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [socialPlatforms, setSocialPlatforms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/dashboard/negocios/${negocioId}/configuracion`
        );
        setBusiness(data.negocio);
        setPageConfig(data.configuracion_pagina || {});
        setColorPalettes(data.paletas_colores || []);
        setBusinessTypes(data.tipos_negocio || []);
        setSocialPlatforms(data.plataformas_redes_sociales || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    if (negocioId) fetchData();
  }, [negocioId]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/dashboard/negocios/${negocioId}`,
        business
      );
      await axios.put(
        `http://localhost:5000/api/dashboard/negocios/${negocioId}/configuracion-pagina`,
        pageConfig
      );
      if (social.plataforma && social.enlace) {
        await axios.post(
          `http://localhost:5000/api/dashboard/negocios/${negocioId}/redes-sociales`,
          social
        );
      }
      alert("Changes saved successfully");
    } catch (err) {
      console.error("Error saving:", err);
      alert("An error occurred while saving");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-10">
      <BusinessInfoForm
        data={business}
        onChange={setBusiness}
        businessTypes={businessTypes}
      />
      <PageConfigurationForm
        data={pageConfig}
        onChange={setPageConfig}
        palettes={colorPalettes}
      />
      <SocialMediaForm
        data={social}
        onChange={setSocial}
        platforms={socialPlatforms}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BusinessSettingsPanel;
