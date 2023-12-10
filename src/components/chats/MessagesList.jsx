import "./chats.scss";
import { Message } from "./Message";
import { memo, useContext, useEffect, useState } from "react";

import { Button, List, ListItem } from "@mui/material";
import { ChatContext } from "../../context/ChatContext";
import { deleteOne } from "../../hooks/useDB";
import { useRef } from "react";


let loading = false

const MessagesList = ({ chatState, setChatState, loadMore }) => {
  const { data } = useContext(ChatContext);
  const messagesEnd = useRef(null);

  const getUserById = (id) => {
    return data.users.find((user) => user.id == id);
  };

  const removeMessage = (messageId) => {
    deleteOne("chats", data.chatId, "messages", messageId);
    setChatState((old) => ({
      ...old,
      messages: old.messages.filter((message) => message.id != messageId),
    }));
  };

  const scrollInto = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!loading) {
      loading = true
      loadMore().then(()=>{
        loading = false
      });
    }
  }, []);

  return (
    <List className="messages">
      <div ref={messagesEnd}></div>
      {chatState.messages.map((message) => (
        <Message
          message={message}
          key={message.id}
          removeMessage={() => removeMessage(message.id)}
          user={getUserById(message.user)}
        />
      ))}
      {chatState.hasMorePages && (
        <ListItem>
          <Button onClick={loadMore}>Pobierz więcej</Button>
        </ListItem>
      )}
    </List>
  );
};

export default memo(MessagesList);
