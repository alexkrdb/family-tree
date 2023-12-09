import { Menu, MenuItem } from "@mui/material";
import { Children, cloneElement, createContext, memo, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";

const MenuContext = createContext();

export const MMenu = (children) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MenuContext.Provider value={[anchorEl, handleClick, handleClose]} {...children} />
  );
};

export const MMenuOpenButton = ({ children: child }) => {
  const [,handleClick, ] = useContext(MenuContext);
  return cloneElement(child, {
    onClick: (event) => {
      handleClick(event);
      child.props.onClick && child.props.onClick();
    },
  });
};

export const MenuContent = memo(({ children }) => {
  const [anchorEl, , handleClose] = useContext(MenuContext);
  const nodes = Children.toArray(children) 
  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
      {nodes.map((child) => (
        <MenuItem onClick={handleClose} key={nodes.indexOf(child)}>
          {child}
        </MenuItem>
      ))}
    </Menu>
  );
});
