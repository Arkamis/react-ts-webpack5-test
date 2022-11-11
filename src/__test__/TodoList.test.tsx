import userEvent from "@testing-library/user-event";
import TodoList from "components/organisms/TodoList";
import * as React from "react";

import { cleanup, customRender } from "./test-utils";

// before
const setUpInitNewField = async (buttonTestId = "add-task-button") => {
  const { getByTestId, getByRole, ...rest } = customRender(<TodoList />);
  const button = getByTestId(buttonTestId);

  const user = userEvent.setup();

  // await user.type(button, "New todo List");
  await user.click(button);
  const taskInput = getByRole("textbox");
  expect(taskInput).toBeInTheDocument();

  return { taskInput, ...rest, getByTestId, button, user, getByRole };
};

describe("Todo List TodoList Functional tests", () => {
  afterEach(cleanup);

  it("should toggle add new Task field", async () => {
    const { user, button, taskInput } = await setUpInitNewField();

    await user.click(button);
    expect(taskInput).not.toBeInTheDocument();
  });

  it("should add new task to list", async () => {
    const { user, taskInput, getByRole, getByText } = await setUpInitNewField();
    await user.type(taskInput, "adding new Todo");
    await user.click(getByRole("button", { name: "save" }));
    expect(getByText("adding new Todo")).toBeInTheDocument();
  });

  // TODO use local storage mock to not repeat insert code
});

describe("To-do list title customization flow", () => {
  afterEach(cleanup);
  it("should display a default title", async () => {
    const { getByText } = customRender(<TodoList />);
    const appTitle = getByText(/My first to-do list!/i);
    expect(appTitle).toBeInTheDocument();
  });
});
