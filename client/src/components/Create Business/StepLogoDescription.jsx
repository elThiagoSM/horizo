import React from "react";
import { TextField } from "@mui/material";

export default function StepLogoDescription({
  register,
  handleLogoChange,
  logoPreview,
}) {
  return (
    <>
      <div className="mb-6">
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

      <TextField
        fullWidth
        label="Descripción del Negocio"
        placeholder="Describe brevemente qué hace tu negocio y a quién sirve"
        {...register("descripcion")}
        multiline
        rows={4}
        margin="normal"
      />
    </>
  );
}
