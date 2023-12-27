import "./mmodal.scss";
import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


/**
 * Modal handler
 * @param  {string} buttonText button text to open the modal
 * @param  {ReactNode} startIcon icon on start of button label 
 * @param  {ReactNode} endIcon icon on end of button 
 * @return {[type]} Simple modal
 */
const MModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <Button
        startIcon={props?.startIcon}
        endIcon={props?.endIcon}
        onClick={handleOpen}
      >
        {props?.buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{overflowY: "hidden"}}
      >
        <Box className="mmodal" sx={{ boxShadow: 24, height: "max-content" }}>
          <IconButton 
            sx={{
              position: "absolute",
              top: "5%",
              right: "10%",
              fontSize: "large",
            }}
            onClick={handleClose}
          >
            <CloseRoundedIcon />
          </IconButton>
            {props?.children}
          
        </Box>
      </Modal>
    </Fragment>
  );
};
export default MModal;
