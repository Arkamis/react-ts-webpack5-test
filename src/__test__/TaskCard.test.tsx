import userEvent from "@testing-library/user-event";
import TaskCard from "components/organisms/TodoList/TaskCard";
import dayjs from "dayjs";
import * as React from "react";
import { calendarDate } from "utils/timezones";

import { cleanup, customRender } from "./test-utils";

const taskCardSetup = () => {
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();

  const envi = customRender(
    <TaskCard
      onEdit={handleEdit}
      onDelete={handleDelete}
      taskDescription="testDescription"
      id="testCardId"
      createdAt={dayjs()}
      updatedAt={dayjs()}
    />
  );
  return { ...envi, handleDelete, handleEdit };
};
describe("Tasks unit testing", () => {
  afterEach(cleanup);
  it("should display a task description and controls for edit, and delete", async () => {
    const { getByRole, handleEdit, handleDelete, getByText, getAllByRole } =
      taskCardSetup();
    const menu = getByRole("button");
    const user = userEvent.setup();

    await user.click(menu);
    const menuOptions = getAllByRole("menuitem");
    // const heading = getByText(/List TodoList/i);
    expect(menuOptions.length === 2).toBeTruthy(); // edit delete controls
    await user.click(menuOptions[0]);
    await user.click(menuOptions[1]);
    expect(handleEdit).toHaveBeenCalled();
    expect(handleDelete).toHaveBeenCalled();
    expect(getByText("testDescription")).toBeInTheDocument();
    expect(getByRole("menu", { hidden: true })).toBeInTheDocument();
  });

  it("should display a task timestamps", async () => {
    const timestamp = dayjs();
    const calendarDateString = calendarDate(timestamp);

    const { getAllByText } = customRender(
      <TaskCard
        onEdit={() => jest.fn()}
        onDelete={() => jest.fn()}
        taskDescription="testDescription"
        id="testCardId"
        createdAt={timestamp}
        updatedAt={timestamp}
      />
    );

    expect(getAllByText(calendarDateString)[0]).toBeInTheDocument();
  });
});
