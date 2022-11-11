import {
  Box,
  Icon,
  IconButton,
  IconButtonProps,
  SvgIconProps,
  Tooltip,
} from "@mui/material";
import * as React from "react";

// interface Size = "small" | "large" | "medium";

export interface TooltipIconButtonProps {
  title: string;
  iconName: string | React.ReactElement<SvgIconProps>;
  onClick?: (e: any | React.MouseEvent<HTMLElement>) => void;
  iconButtonProps: IconButtonProps;
}

const TooltipIconButton = (props: TooltipIconButtonProps) => {
  const {
    title,
    onClick,
    iconName,
    iconButtonProps: { size = "small", ...iconButtonProps },
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick && typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={title}>
          <IconButton
            onClick={handleClick}
            size={size}
            sx={{ ml: 2 }}
            {...iconButtonProps}
          >
            {typeof iconName === "string" ? (
              <Icon sx={{ width: 32, height: 32 }}>{iconName}</Icon>
            ) : (
              React.cloneElement(iconName, { sx: { width: 32, height: 32 } })
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default TooltipIconButton;
