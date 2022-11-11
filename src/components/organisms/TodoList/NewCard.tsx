import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
  taskDescription: Yup.string()
    .min(3, "minLength")
    .max(400, "maxLength")
    .matches(/^(.*)?\S+(.*)?$/, "noOnlyWhiteSpaces")
    .required("required"),
});

interface NewTaskFormValues {
  taskDescription: string;
}

interface Props {
  addNewTodo: (d: string) => void;
  onCancel: () => void;
}

const NewCard = ({ addNewTodo, onCancel }: Props) => {
  const onSubmitHandler = (
    values: NewTaskFormValues,
    {
      setFieldError,
      setSubmitting,
      resetForm,
    }: FormikHelpers<NewTaskFormValues>
  ) => {
    try {
      const { taskDescription } = values;
      addNewTodo(taskDescription);
      resetForm();
    } catch (error) {
      setFieldError("taskDescription", "");
    }
    setSubmitting(false);
  };

  const { t } = useTranslation();
  const formik: FormikProps<NewTaskFormValues> = useFormik({
    initialValues: {
      taskDescription: "",
    },
    onSubmit: onSubmitHandler,
    validationSchema: TaskSchema,
  });

  const { handleSubmit, getFieldProps, values, touched, errors } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Enter a description..."
          {...getFieldProps("taskDescription")}
          value={values.taskDescription}
          error={Boolean(touched.taskDescription && errors.taskDescription)}
          helperText={
            touched.taskDescription &&
            errors.taskDescription &&
            t(`formValidation.${errors.taskDescription}`)
          }
        />
        <Stack direction="row" spacing={1}>
          <Button color="success" variant="contained" type="submit">
            {t`actions.save`}
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            {t`actions.cancel`}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default NewCard;
