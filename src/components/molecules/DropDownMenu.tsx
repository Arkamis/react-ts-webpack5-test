import { Box, Menu, MenuItem } from "@mui/material";
import * as React from "react";
import generateId from "utils/strings";

type ItemType = string | JSX.Element | [JSX.Element];

interface ChildIconButtonProps {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  id?: string;
}

interface Props {
  onItemClick?: (option: ItemType) => void;
  checkIsDisable?: (option: ItemType) => boolean;
  customOptionLabelParser?: (option: ItemType) => any;
  menuOptions: Array<string | JSX.Element | [JSX.Element]>;
  children: (props: ChildIconButtonProps) => React.ReactElement<any>;
  id?: string;
}

export default function DropDownMenu({
  menuOptions,
  onItemClick,
  checkIsDisable,
  customOptionLabelParser,
  children,
  id = `menu-dropdown-${generateId(5)}`,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {children({
          isOpen: open,
          onClick: handleClick,
          id,
        })}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        keepMounted
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuOptions.map((option) =>
          typeof option !== "string" ? (
            option
          ) : (
            <MenuItem
              key={option}
              onClick={() => onItemClick?.(option)}
              disabled={checkIsDisable?.(option)}
            >
              {typeof customOptionLabelParser === "function"
                ? customOptionLabelParser(option)
                : option}
            </MenuItem>
          )
        )}
      </Menu>
    </React.Fragment>
  );
}
