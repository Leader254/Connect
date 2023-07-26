/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/utils";
import './ChatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'


const ChatBox = ({ chat, currentUser, setSendMessage }) => {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // fetching data for our header
    useEffect(() => {
        const friendId = chat?.receiverId;
        const getUser = async () => {
            try {
                const data = await makeRequest.get('users/find/' + friendId);
                // console.log(data.data);
                setUserData(data.data);
                // console.log(data.data);
            } catch (err) {
                console.log(err);
            }
        }
        if (chat !== null) getUser();

    }, [chat, currentUser]);

    // fetching data for our messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                const data = await makeRequest.get('messages/' + chat?.id);
                setMessages(data.data);
                console.log(data.data);
            } catch (err) {
                console.log(err);
            }

        }
        if (chat !== null) getMessages();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat.id,
        };

        // send message to db

        try {
            const data = await makeRequest.post('messages', message);
            setMessages([...messages, data.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }

        // send message to socket server
        const receiverId = chat.receiverId;
        setSendMessage({
            ...message,
            receiverId,
        })

    }



    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img
                                        src={
                                            userData?.profilePic
                                        }
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>
                                            {userData?.username}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" >
                            {messages.map((message) => (
                                <>
                                    <div className={message.receiverId === currentUser ? "message own" : "message"}>
                                        <span>{message.text}</span>{" "}
                                        {/* <span>{format(message.createdAt)}</span> */}
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* Chat sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button btn2" onClick={handleSend}>
                                Send
                            </div>
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">Tap On a conversation to start...</span>
                )
                }

            </div>
        </>
    )
}

export default ChatBox