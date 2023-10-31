import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const Input = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
            message: message,
            time: Timestamp.now(),
            user: currentUser.uid
        })
      });
      setMessage("")
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
};
