import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import { Chat } from "../../components/chats/Chat";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { ChatContext } from "../../context/ChatContext";
import { Input } from "../../components/chats/Input";

function Chats() {
  const { currentUser } = useContext(AuthContext);
  const [ chats, setChats] = useState([]);
  const { data, dispatch } = useContext(ChatContext);

  const handleSelect = ({chat}) => {
    dispatch({
      type: "CHANGE_CHAT",
      payload: chat.users,
      id: chat.id,
    });
  };

  useEffect(() => {
    const getChats = () => {
      //get user from db by uid
      const unsub = onSnapshot(
        doc(db, "users", currentUser.uid),
        async (user) => {
          //get user chats from db from user.chats
          const q = query(
            collection(db, "chats"),
            where("__name__", "in", user.data().chats)
          );
          const querrySnap = await getDocs(q);
          //update chatList
          setChats([]);
          querrySnap.forEach((doc) => {
            setChats((oldChats) => [...oldChats, doc.data()]);
          });
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser && getChats();
  }, [currentUser]);

  return (
    <div className="chatPage">
      <div className="content">
        <div className="chatList">
          {chats?.map((chat) => (
            <div
              className="chatItem"
              key={chat.name}
              onClick={() => handleSelect({chat})}
            >
              {chat.name}
            </div>
          ))}
        </div>
        <div className="chatContent">
        <Chat />
        {(data.chatId != "null") &&<Input />}
        </div>
      </div>
    </div>
  );
}

export default Chats;
