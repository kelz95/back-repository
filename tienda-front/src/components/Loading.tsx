import { Backdrop, CircularProgress } from "@mui/material";
import { MouseEventHandler } from "react";

type LoadingProps = {
  isOpen: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

const Loading = ({ isOpen, onClick }: LoadingProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={isOpen}
      onClick={onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
