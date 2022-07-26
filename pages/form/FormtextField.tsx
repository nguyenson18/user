import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormTextField({ control, name, label, ...other }:any) {
  return (
    <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        error={!!error}
        helperText={error?.message}
        {...other}
      />
    )}
  />
  );
}

export default FormTextField;