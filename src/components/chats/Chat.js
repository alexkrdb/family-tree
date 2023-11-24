import { useContext, Fragment, memo, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Input } from "./Input";
import MessagesList from "./MessagesList";
import { Timestamp } from "firebase/firestore";
import ChatMenu from "./ChatMenu";
export const Chat = memo(() => {

  const [chatState, setChatState] = useState({
    messages: [],
    hasMorePages: true,
    lastDate: Timestamp.now(),
  });
  return (
    <Fragment>
      <ChatMenu/>
      <MessagesList chatState={chatState} setChatState={setChatState}/>
      <Input setChatState={setChatState}/>
    </Fragment>
  );
});
