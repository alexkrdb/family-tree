import { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Message } from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContex";

export const Chat = () => {
  const {currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [chat, setChat] = useState([]);
  const messages = []
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setChat(doc.data());
    });
    return ()=>{
      unsub();
    };
  }, [data.chatId]);
  return (
    <div className="messages">
      <div>{chat.name}</div>
      <div>
        {chat.messages?.map((item)=>(
            <Message message={item.message} user={item.user==currentUser.uid}/>
        ))}
      </div>
    </div>
  );
};
