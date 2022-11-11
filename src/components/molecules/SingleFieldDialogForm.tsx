import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";

import TooltipIconButton from "./TooltipIconButton";

interface ValidSingleFieldDialogFormInitialValue {
  [x: string]: string;
}

export interface FormRelatedProps {
  title: string;
  onSubmit: (p: string) => void;
  initialValue: string;
  fieldName: string;
  extraFieldProps?: TextFieldProps;
  validationSchema: any;
}

export interface SingleFieldDialogFormProps extends FormRelatedProps {
  isOpen: boolean;
  onClose: () => void;
  okText?: string;
  cancelText?: string;
}

const SingleFieldDialogForm = ({
  title,
  onSubmit,
  isOpen,
  onClose,
  fieldName,
  initialValue = "",
  extraFieldProps,
  okText,
  cancelText,
  validationSchema,
}: SingleFieldDialogFormProps) => {
  const { t } = useTranslation();
  const closeTranslation = t(`actions.close`);

  const onSubmitHandler = (
    values: ValidSingleFieldDialogFormInitialValue,
    {
      setFieldError,
      setSubmitting,
      setValues,
      resetForm,
    }: FormikHelpers<ValidSingleFieldDialogFormInitialValue>
  ) => {
    try {
      const fieldValue = values[fieldName];
      onSubmit(fieldValue);
      resetForm();
      setValues({ [fieldName]: fieldValue });
    } catch (error) {
      setFieldError(fieldName, t(`actions.error`) ?? error.message?.toString());
    }
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: {
      [fieldName]: initialValue,
    },
    onSubmit: onSubmitHandler,
    validationSchema,
  });

  const { submitForm, getFieldProps, values, touched, errors } = formik;
  const errorTranslation = t(`formValidation.${errors[fieldName] as string}`);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Typography variant="h4">{title}</Typography>
        {typeof onClose === "function" && (
          <TooltipIconButton
            title={closeTranslation}
            data-testid="cancel-dialog-button"
            iconName={<Close />}
            onClick={onClose}
            iconButtonProps={{
              "aria-label": closeTranslation,
              sx: {
                position: "absolute",
                right: 8,
                top: 8,
              },
            }}
          />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          {...extraFieldProps}
          {...getFieldProps(fieldName)}
          value={values[fieldName]}
          error={Boolean(touched[fieldName] && errors[fieldName])}
          helperText={
            touched[fieldName] &&
            errors[fieldName] &&
            (errorTranslation || errors[fieldName])
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            void (async () => {
              await submitForm();
            })();
          }}
        >
          {okText ?? "ok"}
        </Button>
        {onClose && (
          <Button onClick={onClose} color="error">
            {cancelText ?? t(`actions.cancel`)}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SingleFieldDialogForm;
