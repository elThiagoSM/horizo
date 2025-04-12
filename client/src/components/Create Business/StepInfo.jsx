import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function StepInfo({ register, errors, tiposNegocio }) {
  return (
    <>
      <TextField
        fullWidth
        label="Nombre del Negocio"
        {...register("nombre", { required: true })}
        placeholder="Ej: Cafetería El Buen Sabor"
        margin="normal"
        error={!!errors.nombre}
        helperText={errors.nombre && "Este campo es obligatorio"}
      />

      <TextField
        fullWidth
        label="Eslogan"
        {...register("eslogan", { required: true })}
        placeholder="Ej: Donde el café sabe a hogar"
        margin="normal"
        error={!!errors.eslogan}
        helperText={errors.eslogan && "Este campo es obligatorio"}
      />

      <TextField
        fullWidth
        label="Slug URL"
        {...register("slug_url", { required: true })}
        placeholder="Ej: el-buen-sabor"
        margin="normal"
        error={!!errors.slug_url}
        helperText={errors.slug_url && "Este campo es obligatorio"}
      />

      <FormControl fullWidth margin="normal" error={!!errors.tipo_negocio_id}>
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
        {errors.tipo_negocio_id && (
          <p className="text-red-500 text-sm mt-1">
            Este campo es obligatorio.
          </p>
        )}
      </FormControl>
    </>
  );
}
