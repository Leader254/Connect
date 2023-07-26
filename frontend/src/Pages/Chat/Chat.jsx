import { useContext, useEffect, useRef, useState } from 'react';
import './Chat.css'
import { AuthContext } from '../../Context/authContext';
import { makeRequest } from '../../utils/utils';
import Conversation from '../../Components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi'
import { AiFillMessage } from 'react-icons/ai'
import ChatBox from '../../Components/ChatBox/ChatBox';
import { io } from 'socket.io-client';


const Chat = () => {

    const { user } = useContext(AuthContext);
    // console.log(user)
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const socket = useRef();

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.current = io("http://localhost:8080");
        socket.current.emit("new-user-add", user.id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const data = await makeRequest.get('chats/' + user.id);
                const conversationsArray = Object.values(data); // Extract the array
                setConversations(...conversationsArray);
                console.log(...conversationsArray);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user.id]);

    return (
        <div className="Chat">
            {/* Left-Side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {
                            conversations.map((conversation) => (
                                <div key={conversation.id}
                                    onClick={() => setCurrentChat(conversation)}
                                >
                                    <Conversation data={conversation} currentUser={user.id} />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            {/* Right-Side */}
            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <div className="navIcons">
                        <Link to="/">
                            <HiHome />
                        </Link>
                        <Link to="/chat">
                            <AiFillMessage />
                        </Link>
                    </div>

                    {/* Chat Body */}
                    <ChatBox
                        chat={currentChat}
                        currentUser={user.id}
                        setSendMessage={setSendMessage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat