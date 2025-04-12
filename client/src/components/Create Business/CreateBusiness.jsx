import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InicializarConfiguracion from "../../components/InicializarConfiguracion";
import StepInfo from "./StepInfo";
import StepLocation from "./StepLocation";
import StepLogoDescription from "./StepLogoDescription";

const steps = ["Información", "Ubicación", "Logo y Descripción"];

export default function CreateBusiness() {
  const [negocioCreado, setNegocioCreado] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [logoPreview, setLogoPreview] = useState(null);
  const [tiposNegocio, setTiposNegocio] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/negocios/tipos-negocios"
        );
        const data = await res.json();
        setTiposNegocio(data);
      } catch (err) {
        console.error("Error al cargar tipos de negocios:", err);
      }
    };

    fetchTipos();
  }, []);

  const onSubmit = async (data) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.id;

    if (!usuarioId) {
      alert("No se encontró el usuario en localStorage");
      return;
    }

    const formData = new FormData();
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    formData.append("usuario_id", usuarioId);

    try {
      const res = await fetch("http://localhost:5000/api/negocios/registro", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        const negocioId = result.id || result.negocio_id;
        localStorage.setItem("negocioId", negocioId);
        setNegocioCreado(negocioId);
        alert("Negocio creado con éxito");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        alert("Error: " + result.mensaje);
      }
    } catch (err) {
      alert("Error de red al intentar crear el negocio.");
    }
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const renderStepContent = (step) => {
    const props = {
      register,
      errors,
      tiposNegocio,
      handleLogoChange,
      logoPreview,
    };
    switch (step) {
      case 0:
        return <StepInfo {...props} />;
      case 1:
        return <StepLocation {...props} />;
      case 2:
        return <StepLogoDescription {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Paper elevation={3} className="p-6 rounded-xl">
        <Typography variant="h5" className="mb-6 font-semibold">
          Crear Tu Negocio
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8 space-y-6">
          {renderStepContent(activeStep)}

          <Box className="flex justify-between pt-4">
            {activeStep > 0 && (
              <Button onClick={prevStep} variant="outlined">
                Anterior
              </Button>
            )}

            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit(handleNext)}>
                Siguiente
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}
              >
                Crear Negocio
              </Button>
            )}
          </Box>
        </div>
      </Paper>
      {negocioCreado && <InicializarConfiguracion negocioId={negocioCreado} />}
    </div>
  );
}
