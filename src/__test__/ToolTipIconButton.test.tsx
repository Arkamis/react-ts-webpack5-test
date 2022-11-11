import userEvent from "@testing-library/user-event";
import TooltipIconButton, {
  TooltipIconButtonProps,
} from "components/molecules/TooltipIconButton";
import * as React from "react";

import { cleanup, customRender } from "./test-utils";

const setupRender = (
  props?: TooltipIconButtonProps | Partial<TooltipIconButtonProps>
) => {
  const defaultProps = {
    ...props,
    title: "test title",
    iconName: "edit",
  };
  const envi = customRender(
    <TooltipIconButton
      {...defaultProps}
      iconButtonProps={{
        size: "medium",
      }}
    />
  );
  return { ...envi };
};

describe("ToolTipIconButton Menu display properly", () => {
  afterEach(cleanup);

  it("Should display tooltip title on mouseover and button", async () => {
    const { getByRole, findByText } = setupRender();

    const user = userEvent.setup();
    await user.hover(getByRole("button"));

    // Wait for the tooltip to show up
    const tooltipText = await findByText(/test title/i);

    expect(getByRole("button")).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });

  it("Should call onClick function when icon button is clicked", async () => {
    const handler = jest.fn();
    const props = { onClick: handler };
    const { getByRole } = setupRender(props);

    const user = userEvent.setup();
    await user.click(getByRole("button"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
