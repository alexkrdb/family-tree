import { memo, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { Modal, ModalContents, ModalOpenButton } from "../modal/newModal";

const ChatMenu = memo(() => {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <Modal>
      <ModalOpenButton>
        <AppBar
          sx={{ backgroundColor: "#eeeeee", color: "black" }}
          position="sticky"
        >
          <Toolbar sx={{ gap: "1rem" }}>
            <Avatar
              src={data.data?.photoUrl}
              alt="ChatAvatar"
              sx={{ width: 50, height: 50 }}
            />
            {data.data.name}
          </Toolbar>
        </AppBar>
      </ModalOpenButton>
      <ModalContents title={data.data.name}>
        Hello
      </ModalContents>
    </Modal>
  );
});

export default ChatMenu;
