import React from "react";
import { TextField } from "@mui/material";

export default function StepLocation({ register, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextField
        fullWidth
        label="Dirección"
        placeholder="Ej: Calle 123, Local 4"
        {...register("direccion")}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Ciudad"
        placeholder="Ej: Medellín"
        {...register("ciudad", { required: true })}
        margin="normal"
        error={!!errors.ciudad}
        helperText={errors.ciudad && "Este campo es obligatorio"}
      />

      <TextField
        fullWidth
        label="Provincia"
        placeholder="Ej: Antioquia"
        {...register("provincia")}
        margin="normal"
      />

      <TextField
        fullWidth
        label="País"
        placeholder="Ej: Colombia"
        {...register("pais", { required: true })}
        margin="normal"
        error={!!errors.pais}
        helperText={errors.pais && "Este campo es obligatorio"}
      />

      <TextField
        fullWidth
        label="Zona Horaria"
        placeholder="Ej: America/Bogota"
        {...register("zona_horaria")}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Latitud"
        type="number"
        inputProps={{ step: "0.000001" }}
        placeholder="Ej: 6.25184"
        {...register("latitud")}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Longitud"
        type="number"
        inputProps={{ step: "0.000001" }}
        placeholder="Ej: -75.56359"
        {...register("longitud")}
        margin="normal"
      />
    </div>
  );
}
