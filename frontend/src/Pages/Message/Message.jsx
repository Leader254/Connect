import '../../CSS/Message.css'

const Message = ({ own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="https://images.pexels.com/photos/13630259/pexels-photo-13630259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <p className='messageText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}

export default Message