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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InicializarConfiguracion from "../../components/InicializarConfiguracion";

const steps = ["Información", "Ubicación", "Logo y Descripción"];

export default function CreateBusiness() {
  const [negocioCreado, setNegocioCreado] = useState(false);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [logoPreview, setLogoPreview] = useState(null);
  const [tiposNegocio, setTiposNegocio] = useState([]);

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
    formData.append("usuario_id", usuarioId);
    formData.append("nombre", data.nombre);
    formData.append("eslogan", data.eslogan || "");
    formData.append("slug_url", data.slug_url);
    formData.append("tipo_negocio_id", data.tipo_negocio_id);
    formData.append("direccion", data.direccion || "");
    formData.append("ciudad", data.ciudad);
    formData.append("provincia", data.provincia || "");
    formData.append("pais", data.pais);
    formData.append("latitud", data.latitud || "");
    formData.append("longitud", data.longitud || "");
    formData.append("zona_horaria", data.zona_horaria || "");
    formData.append("descripcion", data.descripcion || "");
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }

    try {
      const res = await fetch("http://localhost:5000/api/negocios/registro", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        const negocioId = result.id || result.negocio_id;
        console.log("Negocio ID que se va a usar:", negocioId);

        // Guardarlo en localStorage
        localStorage.setItem("negocioId", negocioId);

        // Establecer que el negocio ha sido creado
        setNegocioCreado(negocioId);

        alert("Negocio creado con éxito");
        console.log(result);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        alert("Error: " + result.mensaje);
        console.error(result);
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      alert("Error de red al intentar crear el negocio.");
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Input label="Nombre" name="nombre" register={register} required />
            <Input label="Eslogan" name="eslogan" register={register} />
            <Input
              label="Slug URL"
              name="slug_url"
              register={register}
              required
            />
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel id="tipo-negocio-label">Tipo de Negocio</InputLabel>
                <Select
                  labelId="tipo-negocio-label"
                  id="tipo_negocio_id"
                  defaultValue=""
                  {...register("tipo_negocio_id", { required: true })}
                >
                  {tiposNegocio.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.tipo_negocio_id && (
                <p className="text-red-500 text-sm mt-1">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <Input label="Dirección" name="direccion" register={register} />
            <Input label="Ciudad" name="ciudad" register={register} required />
            <Input label="Provincia" name="provincia" register={register} />
            <Input label="País" name="pais" register={register} required />
            <Input
              label="Zona Horaria"
              name="zona_horaria"
              register={register}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latitud (opcional)"
                name="latitud"
                type="number"
                step="0.000001"
                register={register}
              />
              <Input
                label="Longitud (opcional)"
                name="longitud"
                type="number"
                step="0.000001"
                register={register}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo del Negocio
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="block w-full text-sm text-gray-700"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Preview Logo"
                  className="mt-4 w-32 h-32 object-contain rounded border"
                />
              )}
            </div>
            <Input
              label="Descripción del Negocio"
              name="descripcion"
              register={register}
              textarea
            />
          </>
        );
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
                type="button"
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

function Input({
  label,
  name,
  register,
  required,
  type = "text",
  step,
  textarea = false,
}) {
  const baseStyles =
    "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          {...register(name, { required })}
          className={baseStyles}
        />
      ) : (
        <input
          id={name}
          type={type}
          step={step}
          {...register(name, { required })}
          className={baseStyles}
        />
      )}
    </div>
  );
}
