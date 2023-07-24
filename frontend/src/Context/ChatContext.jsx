/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const ChatContext = createContext();

export const useChatContext = () => {
    return useContext(ChatContext);
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHAT_INFO':
            return {
                ...state,
                senderId: action.payload.senderId,
                receiverId: action.payload.receiverId,
                roomId: action.payload.roomId,
            };
        default:
            return state;
    }
};

const ChatContextProvider = ({ children }) => {
    const initialState = {
        senderId: null,
        receiverId: null,
        roomId: null,
    };

    const [chatInfo, dispatch] = useReducer(chatReducer, initialState);

    const setNewChatInfo = ({ senderId, receiverId, roomId }) => {
        dispatch({
            type: 'SET_CHAT_INFO',
            payload: {
                senderId,
                receiverId,
                roomId,
            },
        });
    };

    return (
        <ChatContext.Provider value={{ chatInfo, setNewChatInfo }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
