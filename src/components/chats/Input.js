import { memo, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { saveOne, updateOne } from "../../hooks/useDB";
import { v1 } from "uuid";

export const Input = memo(({setChatState}) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      const id = v1()
      const obj = {
        id: id,
        message: message,
        time: Timestamp.now(),
        user: currentUser.uid,
      }
      await saveOne(
        obj,
        "chats",
        data.chatId,
        "messages",
        id
      );
      setMessage(""); 
      setChatState((oldState) => ({...oldState, messages: [...oldState.messages, obj]}))
    }
  };

  return (
    <form className="input">
      <div className="text">
        <input
          type="text"
          placeholder="Wpisz cos"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        ></input>
      </div>
      <div className="buttons">
        <input type="submit" onClick={handleSubmit} value="Wyślij" />
      </div>
    </form>
  );
});
