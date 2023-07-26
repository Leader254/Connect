import { useContext, useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
import { useChatContext } from "../../Context/ChatContext";
import Navbar from "../../Components/Navbar/Navbar";
import Conversation from "../../Components/Conversation/Conversation";
import Message from "../Message/Message";
import Online from "../Online/Online";
import { BsSendFill } from "react-icons/bs";
import "../../Css/Messenger.css";
import { SocketContext } from "../../Context/SocketContext";

const Messenger = () => {
    const [messages, setMessages] = useState("");
    const { chatInfo } = useChatContext();
    const socket = useContext(SocketContext);

    const handleSend = () => {
        if (messages.trim()) {
            const message = {
                senderId: chatInfo.senderId,
                messages: messages,
                roomId: chatInfo.roomId,
                receiverId: chatInfo.receiverId,
                createdAt: new Date().toISOString(),
            };

            socket.emit("joinRoom", chatInfo.roomId);
            socket.emit("sendMessage", message);
            setMessages("");
        }
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleChange = (e) => {
        setMessages(e.target.value);
    };

    useEffect(() => {
        socket.on("getMessage", (data) => {
            console.log(data);
        });
        return () => {
            socket.off("getMessage");
        };
    }, [socket]);

    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            {/* Display messages here */}
                            {/* For example, you can map over the messages array and render each message */}
                            {/* messages.map((message, index) => (
                                <Message key={index} message={message} />
                            )) */}
                            <Message own={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <input
                                className="chatMessageInput"
                                placeholder="write something..."
                                value={messages}
                                onChange={handleChange}
                                onKeyPress={handleInput}
                            />
                            <button className="chatSubmitButton" onClick={handleSend}>
                                <BsSendFill />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <Online />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
