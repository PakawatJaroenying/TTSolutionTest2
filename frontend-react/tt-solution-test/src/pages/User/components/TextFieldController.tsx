import { TextField, Typography } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "./ModalForm";

interface ITextFieldController {
  control: Control<Inputs, any>;
  id: string;
  name: keyof Inputs;
  label: string;
  errors: FieldErrors<Inputs>;
}

function TextFieldController(props: ITextFieldController) {
  const { control, name, label, id } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(field) => {
          return (
            <TextField
              value={field.field.value}
              error={!!props.errors[name]}
              onChange={(e) => {
                field.field.onChange(e.target.value);
              }}
              {...field}
              key={id}
              id={id}
              label={label}
              variant="outlined"
              sx={{ mt: 2 }}
              helperText={
                <Typography> {props.errors[name]?.message}</Typography>
              }
            />
          );
        }}
      />
    </>
  );
}

export default TextFieldController;
