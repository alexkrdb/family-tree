import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { Form } from "../../context/FormContext";
import { Chat } from "../../components/chats/Chat";
import { doc, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState, useContext, memo } from "react";
import { db } from "../../config/firebase";
import { readMany } from "../../hooks/useDB";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../../components/modal/newModal";
import { Button } from "@mui/material";
import ChatCreator, {
  SaveNewChatButton,
} from "../../components/chats/ChatCreator";

function Chats() {
  console.count("refreshed");
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const { data, dispatch } = useContext(ChatContext);

  const handleSelect = (   chat ) => {
    dispatch({
      type: "CHANGE_CHAT",
      payload: chat,
      id: chat.id,
    });
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        //get user from db by uid
        doc(db, "users", currentUser.uid),
        async (userSnap) => {
          const querrySnap = await readMany(
            //get user chats from db from user.chats
            [where("users", "array-contains", userSnap.id)],
            "chats"
          );
          setChats(querrySnap); //update chatList
          setUser(userSnap.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser && getChats();
  }, [currentUser]);


  // console.log(data);
  return (
    <div className="chatPage">
      <div className="content">
        <div className="chatList">
          {chats?.map((chat) => (
            <div
              className="chatItem"
              key={chat.id}
              onClick={() => handleSelect(chat)}
            >
              {chat.name}
            </div>
          ))}
          <CreateChatModal
            currentUser={currentUser}
            chatsLength={chats.length}
            userFamily={user.family}
          />
        </div>
        <div className="chatContent">{data.chatId && <Chat key={data.chatId}/>}</div>
      </div>
    </div>
  );
}

const CreateChatModal = ({ currentUser, chatsLength, userFamily }) => {
  return (
    <Modal>
      <Form
        initState={{
          chatName: "",
          selectedPeople: [currentUser?.uid],
          photos: [],
        }}
        key={currentUser?.uid}
      >
        <ModalOpenButton>
          <div className="chatItem" key="newChat">
            {chatsLength == 0 && "Jeszcze nie masz czatów"}
            <Button>Utworz nowy</Button>
          </div>
        </ModalOpenButton>

        <ModalContents
          title="Utworz nowy czat"
          actions={
            <div>
              <ModalDismissButton>
                <Button variant="text" color="error">
                  Cancel
                </Button>
              </ModalDismissButton>
              <SaveNewChatButton />
            </div>
          }
        >
          <ChatCreator people={userFamily || []} key={userFamily?.length} />
        </ModalContents>
      </Form>
    </Modal>
  );
};

export default memo(Chats);
