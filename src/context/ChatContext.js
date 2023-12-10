import { createContext, useEffect, useReducer} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: null,
    users: [],
    data: {}
  }


  const chatReducer = (state, action) =>{
    switch(action.type){
      case "CHANGE_CHAT":
        return {
          data: action.payload, 
          chatId: action.id,
          users: []
        }

      case "UPDATE_USERS":
        return {
          data: state.data,
          chatId: state.chatId,
          users: action.users
        }
      case "UPDATE_CHAT_INFO":
        return{
          data: action.data, 
          chatId: state.chatId,
          users: state.users
        }

      default: 
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
    </ChatContext.Provider>
  );
  
};
