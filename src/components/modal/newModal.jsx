import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { cloneElement, createContext, useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}


function ModalContentsBase({width="lg", ...props}) {
  const [isOpen, setIsOpen] = useContext(ModalContext);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth={width}
      {...props}
    >
      {props.children}
    </Dialog>
  );
}


function ModalContents({ title, actions, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div>
        <ModalDismissButton>
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </ModalDismissButton>

        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          dividers
          sx={{ display: "flex", gap: "1rem", height: "60vh", padding: "8px 12px" }}
        >
          {children}
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </div>
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
