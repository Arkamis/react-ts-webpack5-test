import userEvent from "@testing-library/user-event";
import SingleFieldDialogForm from "components/molecules/SingleFieldDialogForm";
import * as React from "react";
import * as Yup from "yup";

import { cleanup, customRender, waitFor } from "./test-utils";

afterEach(cleanup);

const setupBeforeTest = (initialValue = "") => {
  const handleSubmit = jest.fn();

  const data = customRender(
    <SingleFieldDialogForm
      isOpen
      onSubmit={handleSubmit}
      onClose={jest.fn()}
      title="title example"
      fieldName="testing"
      initialValue={initialValue}
      cancelText="cancel test"
      validationSchema={Yup.object().shape({
        testing: Yup.string().min(3, "minLength").required("required"),
      })}
    />
  );
  return { handleSubmit, ...data };
};
describe("Simple Dialog form interaction", () => {
  it("should render input, submit and canceled interface elements", async () => {
    const { getByRole } = setupBeforeTest("test description");

    expect(getByRole("button", { name: "cancel test" })).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("button", { name: "ok" })).toBeInTheDocument();
  });

  it("should edit existing initialValues", async () => {
    const { handleSubmit, getByRole } = setupBeforeTest("test description");
    const user = userEvent.setup();

    const input = getByRole("textbox");
    await user.type(input, " WITH MORE");

    await user.click(getByRole("button", { name: /ok/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith("test description WITH MORE")
    );
  });

  it("should enforce validation rules passed in as props", async () => {
    const { handleSubmit, getByRole, getByText } = setupBeforeTest("");
    const input = getByRole("textbox");

    const user = userEvent.setup();

    await user.clear(input);
    await user.click(getByRole("button", { name: "ok" }));

    const validationMessage = "This field is required";
    expect(handleSubmit).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(getByText(validationMessage)).toBeInTheDocument();
    });
  });
});
