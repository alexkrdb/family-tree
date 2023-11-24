import { createContext, useReducer} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: null,
    data: {}
  }

  const chatReducer = (state, action) =>{
    switch(action.type){
      case "CHANGE_CHAT":
        return {
          data: action.payload, 
          chatId: action.id
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
