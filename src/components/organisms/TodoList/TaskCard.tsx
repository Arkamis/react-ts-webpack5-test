import { Delete, Description, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Icon,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import DropDownMenu from "components/molecules/DropDownMenu";
import TooltipIconButton from "components/molecules/TooltipIconButton";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { calendarDate, DayjsDate } from "utils/timezones";

import { Task } from "./TodoList";

interface TimeOptionProps {
  dateTime: DayjsDate;
  label: string;
  iconName: "update" | "scheduled";
}
export const TimeOption = ({ dateTime, label, iconName }: TimeOptionProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Icon>{iconName}</Icon>
      <Typography variant="body2" fontWeight={200}>
        {label}
      </Typography>
      <Typography variant="body1">{calendarDate(dateTime)}</Typography>
    </Stack>
  );
};

const menuOptions = ["editTodo", "deleteTodo"];

interface Props extends Task {
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard = ({
  taskDescription,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: Props) => {
  const theme = useTheme();
  const isScreenMdSize = useMediaQuery(theme.breakpoints.up("sm"));
  const { t } = useTranslation();

  const handleMenuOptionRender = (option: string) => {
    const isDelete = Boolean(option.includes("delete"));
    return (
      <>
        {isDelete && <Divider />}
        <Box
          sx={{
            display: "flex",
            aligItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ListItemIcon>
            {/* <Icon fontSize="small">{isDelete ? "Delete" : "Edit"}</Icon> */}
            {isDelete ? <Delete fontSize="small" /> : <Edit fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{t(`todoList.actions.${option}`)}</ListItemText>
        </Box>
      </>
    );
  };

  const handleMenuOption = (option: string) => {
    const isDelete = Boolean(option.includes("delete"));
    if (isDelete && typeof onDelete === "function") {
      onDelete();
    } else if (typeof onEdit === "function") {
      onEdit();
    }
  };

  return (
    <Card
      sx={{
        p: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 0.2, sm: 1 }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Description />
        <Stack direction="column" spacing={2}>
          <Typography>{taskDescription}</Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={
              <Divider
                orientation={isScreenMdSize ? "vertical" : "horizontal"}
                flexItem
              />
            }
            spacing={2}
          >
            <TimeOption
              label={t`todoList.timestamps.created`}
              iconName="scheduled"
              dateTime={createdAt}
            />
            <TimeOption
              label={t`todoList.timestamps.updated`}
              iconName="update"
              dateTime={updatedAt}
            />
          </Stack>
        </Stack>
        <DropDownMenu
          menuOptions={menuOptions}
          onItemClick={handleMenuOption}
          // checkIsDisable={checkIsActiveLanguage}
          customOptionLabelParser={handleMenuOptionRender}
        >
          {({ isOpen, onClick, id }) => (
            <TooltipIconButton
              title={t`languageSettings.instructions`}
              onClick={onClick}
              iconButtonProps={{
                id,
                "aria-controls": isOpen ? id : undefined,
                "aria-haspopup": "true",
                "aria-expanded": isOpen ? "true" : undefined,
              }}
              iconName={<MoreHoriz />}
            />
          )}
        </DropDownMenu>
      </Stack>
    </Card>
  );
};

export default TaskCard;
