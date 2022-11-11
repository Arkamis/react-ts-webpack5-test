import { LanguageOutlined } from "@mui/icons-material";
import userEvent from "@testing-library/user-event";
import MainNavbar from "components/layout/MainNavbar";
import DropDownMenu from "components/molecules/DropDownMenu";
import TooltipIconButton from "components/molecules/TooltipIconButton";
import * as React from "react";

import { cleanup, customRender } from "./test-utils";

interface TestMenuProps {
  menuOptions: string[];
  handleSuccess: () => void;
  customParser: (a: string) => string | JSX.Element | [JSX.Element];
  checkIsDisable?: (a: string) => boolean;
}
function MenuIconDropDown({
  menuOptions,
  handleSuccess,
  customParser,
  checkIsDisable,
}: TestMenuProps) {
  return (
    <DropDownMenu
      menuOptions={menuOptions}
      onItemClick={handleSuccess}
      checkIsDisable={checkIsDisable}
      customOptionLabelParser={customParser}
    >
      {({ isOpen, onClick, id }) => (
        <TooltipIconButton
          title="test Title"
          onClick={onClick}
          iconButtonProps={{
            id,
            "aria-controls": isOpen ? id : undefined,
            "aria-haspopup": "true",
            "aria-expanded": isOpen ? "true" : undefined,
          }}
          iconName={<LanguageOutlined />}
        />
      )}
    </DropDownMenu>
  );
}

const languagesSetup = () => {
  const envi = customRender(<MainNavbar />); // It handles i18n
  return { ...envi };
};

const setupDropdown = () => {
  const handleItemClick = jest.fn();
  const menuOpts = ["Test 1", "Test 2", "Test 3"];
  const customParser = jest.fn().mockReturnValue("test task 0");
  const envi = customRender(
    <MenuIconDropDown
      customParser={customParser}
      menuOptions={menuOpts}
      handleSuccess={handleItemClick}
    />
  );
  return { ...envi, handleItemClick, menuOpts, customParser };
};

describe("Dropdown Menu", () => {
  afterEach(cleanup);

  it("is part of the DOM by default but hidden", () => {
    const { getByRole } = setupDropdown();

    expect(getByRole("menu", { hidden: true })).toBeInTheDocument();
  });

  it("does not gain any focus when mounted", () => {
    const { getByRole } = setupDropdown();

    expect(getByRole("menu", { hidden: true })).not.toContain(
      document.activeElement
    );
  });
});

// ------------------------------------------
describe("<DropDownMenu/> | on Support 2 different languages", () => {
  it("should display languages options as menu", async () => {
    const { getAllByRole, getByRole } = languagesSetup();
    const iconButton = getByRole("button");

    const user = userEvent.setup();

    await user.click(iconButton);
    const menuitems = getAllByRole("menuitem");
    // for now only support for 2
    expect(menuitems[0]).toHaveFocus();
    expect(menuitems[0]).toHaveProperty("tabIndex", 0);
    expect(menuitems.length).toEqual(2);
  });

  it("Change user language", async () => {
    const { getAllByRole, getByRole, getByText } = languagesSetup();
    const iconButton = getByRole("button");

    const user = userEvent.setup();

    expect(getByText(/List App/i)).toBeInTheDocument();
    await user.click(iconButton);
    const menuitems = getAllByRole("menuitem");
    await user.click(menuitems[0]);
    expect(getByText(/App Listado/i)).toBeInTheDocument();
  });
});
