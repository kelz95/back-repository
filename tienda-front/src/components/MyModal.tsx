import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, ModalProps, Typography } from "@mui/material";
import { ReactNode } from "react";

type MyModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onCloseButton?: () => void;
  onOverlayClick?: () => void;
  title?: string;
  willCloseOnEsc?: boolean;
} & Omit<ModalProps, "disableEscapeKeyDown" | "open" | "onClose" | "onBackdropClick">;

const MyModal = ({
  children,
  isOpen,
  onClose,
  onCloseButton,
  onOverlayClick,

  title,
  willCloseOnEsc,
  ...modalProps
}: MyModalProps) => {
  const backgroundColor = "white";

  return (
    <Modal
      disableEscapeKeyDown={!willCloseOnEsc}
      open={isOpen}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
      onBackdropClick={onOverlayClick}
      // sx={{ width: "40rem" }}
      {...modalProps}
    >
      <Box
        bgcolor={backgroundColor}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          minWidth: { xs: "14rem", sm: "20rem" },
          padding: 4,
        }}
      >
        <Box>
          {title && (
            <Typography component="h2" paddingX={5} textAlign="center" variant="h5">
              {title}
            </Typography>
          )}
          <IconButton
            onClick={onCloseButton || onClose}
            sx={{ position: "absolute", right: 4, top: 3 }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box paddingY={4}>{children}</Box>
      </Box>
    </Modal>
  );
};

export { MyModal };
