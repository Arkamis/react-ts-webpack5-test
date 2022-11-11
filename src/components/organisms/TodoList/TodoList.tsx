import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import SingleFieldDialogForm, {
  FormRelatedProps,
} from "components/molecules/SingleFieldDialogForm";
import TaskCard from "components/organisms/TodoList/TaskCard";
import { Dayjs } from "dayjs";
import useLocalStorage from "hooks/useLocalStorage";
import * as React from "react";
import { useTranslation } from "react-i18next";
import generateId from "utils/strings";
import { localDayjs } from "utils/timezones";
import * as Yup from "yup";

import NewCard, { TaskSchema } from "./NewCard";
import TitleBar from "./TitleBar";

const TitleSchema = Yup.object().shape({
  todolistTitle: Yup.string()
    .min(5, "minLength")
    .max(20, "maxLength")
    .matches(/^(.*)?\S+(.*)?$/, "noOnlyWhiteSpaces")
    .required("required"),
});
export interface Task {
  id: string;
  taskDescription: string;
  createdAt: Date | Dayjs;
  updatedAt: Date | Dayjs;
}

interface TodoListValues {
  title: string;
  tasksList: Task[];
}

const TodoList = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogProps, setDialogProps] = React.useState<null | FormRelatedProps>(
    null
  );
  const [todoList, setTodoList] = useLocalStorage<TodoListValues>("todoList", {
    tasksList: [],
    title: t(`todoList.initialTitle`),
  });
  const [isAddingNewTodo, setIsAddingNewTodo] = React.useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSetAddingNewTodoStateToggle = () => {
    setIsAddingNewTodo((wasAdding) => !wasAdding);
  };

  const modifyTodoList = (fieldsToUpset: Partial<TodoListValues>) => {
    setTodoList({ ...todoList, ...fieldsToUpset });
    handleDialogClose();
  };

  const addNewTodo = (todoDescription: string) => {
    const timestamp = localDayjs();
    const newTodo: Task = {
      taskDescription: todoDescription.trim(),
      id: generateId(5),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    modifyTodoList({
      tasksList: [newTodo, ...todoList.tasksList],
    });
    handleSetAddingNewTodoStateToggle();
  };

  const editTodo = (taskId: string, taskDescription: string) => {
    const newTaskBodyToUpset = {
      taskDescription,
      updatedAt: localDayjs(),
    };
    const newTasksList = todoList.tasksList.map((task) => {
      return {
        ...task,
        ...(task.id === taskId && newTaskBodyToUpset),
      };
    });
    modifyTodoList({ tasksList: newTasksList });
  };

  const deleteTodo = (todoId: string) => {
    const newTasksList = todoList.tasksList.filter(
      (task) => task.id !== todoId
    );

    modifyTodoList({ tasksList: newTasksList });
  };

  const handleDialogOpen = (idTask?: string, taskDescription?: string) => {
    const propsDialog: FormRelatedProps =
      idTask && typeof taskDescription === "string" // isEditTaskAssignment
        ? {
            title: t(`todoList.actions.editTodo`),
            onSubmit: (value) => editTodo(idTask, value),
            extraFieldProps: {
              fullWidth: true,
              required: true,
              multiline: true,
              minRows: 4,
            },
            fieldName: "taskDescription",
            initialValue: taskDescription,
            validationSchema: TaskSchema,
          }
        : {
            title: t(`todoList.actions.editTitle`),
            onSubmit: (value: any) =>
              modifyTodoList({ title: value as string }),
            fieldName: "todolistTitle",
            initialValue: todoList.title,
            extraFieldProps: {
              required: true,
            },
            validationSchema: TitleSchema,
          };
    setIsDialogOpen(true);
    setDialogProps(propsDialog);
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        alignItems="center"
        sx={{
          mt: 3,
          px: {
            sx: 1,
            md: 3,
          },
        }}
      >
        <TitleBar
          title={todoList.title}
          onEditTitleClick={() => handleDialogOpen()}
          onNewTodo={handleSetAddingNewTodoStateToggle}
        />
        <Divider orientation="horizontal" flexItem sx={{ mt: 0.5 }} />
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: "100%", height: "500px" }}
        >
          {isAddingNewTodo && (
            <NewCard
              addNewTodo={addNewTodo}
              onCancel={() => handleSetAddingNewTodoStateToggle()}
            />
          )}
          {todoList?.tasksList.map((todo) => (
            <Box key={`taskCard-${todo.id}`}>
              <TaskCard
                {...todo}
                onEdit={() => handleDialogOpen(todo.id, todo.taskDescription)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
      {dialogProps && (
        <SingleFieldDialogForm
          {...dialogProps}
          okText={t(`actions.save`)}
          onClose={handleDialogClose}
          isOpen={isDialogOpen}
        />
      )}
    </>
  );
};

export default TodoList;
