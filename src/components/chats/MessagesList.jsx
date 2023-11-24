import { Message } from "./Message";
import InfiniteScroll from "react-infinite-scroller";
import { memo, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { readMany } from "../../hooks/useDB";
import { Timestamp, endBefore, limit, orderBy, startAfter } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";

const MessagesList = ({chatState, setChatState}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messagesPerPage = 20;


  const loadMore = async () => {
    const page = await readMany(
      [limit(messagesPerPage), orderBy("time"), endBefore(chatState.lastDate)],
      "chats",
      data.chatId,
      "messages"
    );
    const hasMorePages = page.length >= messagesPerPage
    page.concat(chatState.messages);

    setChatState({messages: page, hasMorePages: hasMorePages, lastDate: page[page.length - 1].time || chatState.lastDate});
  };
  console.log(chatState.messages);
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      className="messages"
      isReverse={true}
      useWindow={false}
      hasMore={chatState.hasMorePages}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <ul>
        {chatState.messages.map((message) => (
            <Message
              message={message}
              user={message.user === currentUser.uid}
              key={message.id}
            />
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default memo(MessagesList);
