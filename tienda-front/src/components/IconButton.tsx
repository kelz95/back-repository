import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

type IconButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tip: string;
  tipPlacement?:
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start";

  tooltipProps?: Omit<TooltipProps, "title" | "placement">;
  iconButtonProps?: Omit<MuiIconButtonProps, "onClick">;
};
const IconButton = ({
  children,
  tip,
  tipPlacement = "top",
  onClick,
  tooltipProps,
  iconButtonProps,
}: IconButtonProps) => {
  return (
    <Tooltip title={tip} placement={tipPlacement} {...tooltipProps}>
      <MuiIconButton onClick={onClick} {...iconButtonProps}>
        {children}
      </MuiIconButton>
    </Tooltip>
  );
};

export default IconButton;
