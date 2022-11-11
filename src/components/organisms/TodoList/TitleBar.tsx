import { AddCircleOutline, Edit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  onNewTodo: () => void;
  onEditTitleClick: () => void;
}

const TitleBar = (props: Props) => {
  const { title, onNewTodo, onEditTitleClick } = props;
  const { t } = useTranslation();
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={1}
      alignContent="center"
      justifyContent="flex-start"
    >
      <Typography variant="h2">{title}</Typography>
      <Box sx={{ flexGrow: 2 }} />
      <Button
        data-testid="edit-title-button"
        startIcon={<Edit />}
        variant="outlined"
        onClick={() => onEditTitleClick()}
      >{t`todoList.actions.editTitle`}</Button>
      <Button
        data-testid="add-task-button"
        startIcon={<AddCircleOutline />}
        variant="contained"
        onClick={onNewTodo}
      >{t`todoList.actions.addTodo`}</Button>
    </Stack>
  );
};

export default TitleBar;
