import Navbar from '../../Components/Navbar/Navbar'
import '../../Css/Messenger.css'
import Conversation from '../../Components/Conversation/Conversation'
import Message from '../Message/Message'
import Online from '../Online/Online'
import { BsSendFill } from 'react-icons/bs'
// import io from 'socket.io-client'
// import {v4 as uuid } from "uuid"
import { useChatContext } from '../../Context/ChatContext'

const Messenger = () => {
    const { chatInfo } = useChatContext()
    console.log(chatInfo)
    // const socket = io("http://localhost:3000", {query: {roomId: roomId}})
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
                            <Message own={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <input className="chatMessageInput" placeholder="write something..." />
                            <button className="chatSubmitButton">
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
    )
}

export default Messenger