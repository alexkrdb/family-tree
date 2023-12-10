import { useContext, Fragment, memo, useState, lazy, useEffect } from "react";
import { Input } from "./Input";
import MessagesList from "./MessagesList";
import { Timestamp, startAfter } from "firebase/firestore";
import { getUserShortInfoByIds, readMany } from "../../hooks/useDB";
import {
  limit,
  orderBy
} from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
const ChatMenu = lazy(() => import("./ChatMenu"));

export const Chat = memo(() => {
  const { data, dispatch } = useContext(ChatContext);
  const messagesPerPage = 20;
  const [chatState, setChatState] = useState({
    messages: [],
    hasMorePages: true,
    loading: false, 
    lastDate: Timestamp.now(),
  });
  

  useEffect(() => {
    const fetchData = async () => {
      const people = await getUserShortInfoByIds(data.data.users);
      dispatch({
        type: "UPDATE_USERS",
        users: people,
      })
    };
    
    data.data.users?.length > 0 && fetchData();
  }, [data.chatId]);

  const loadMore = async () => {
    // console.log("try to load next page, loading: ", chatState.loading);

    if (!chatState.loading) {
      setChatState((old) => ({ ...old, loading: true }));
      // console.log("lastDate: ", chatState.lastDate.toDate());
      const page = await readMany(
        [
          orderBy("time", "desc"),
          startAfter(chatState.lastDate),
          limit(messagesPerPage),
        ],
        "chats",
        data.chatId,
        "messages"
      )
      const hasMorePages = page.length >= messagesPerPage;
      const lastDate = page[page.length - 1]?.time || chatState.lastDate
      const new_mess = chatState.messages
      new_mess.push(...page)
      

      setChatState({
        messages: new_mess,
        hasMorePages: hasMorePages,
        loading: false,
        lastDate: lastDate,
      });
    }
    
  };

  return (
    <Fragment>
      <ChatMenu/>
      <MessagesList chatState={chatState} setChatState={setChatState} loadMore={loadMore}/>
      <Input setChatState={setChatState}/>
    </Fragment>
  );
});
