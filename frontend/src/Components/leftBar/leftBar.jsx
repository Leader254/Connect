import { FaUserFriends } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
// import { IoGameController } from 'react-icons/io'
import { FaGamepad } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import '../../CSS/leftBar.css'
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

const LeftBar = () => {
    const { currentuser } = useContext(AuthContext);
    return (
        <div className="leftbar">
            <div className="container1">
                <div className="menu">
                    <div className="user">
                        <img src={currentuser.profilePic} alt="" />
                        <span>{currentuser.username}</span>
                    </div>
                    <div className="item">
                        <FaUserFriends className='icon' />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <MdOutlineGroups className='icon' />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        {/* <IoGameController className='icon' /> */}
                        <FaGamepad className='icon' />
                        <span>Gaming Zone</span>
                    </div>
                    <div className="item">
                        <FaUserFriends className='icon' />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <FaUserFriends className='icon' />
                        <span>Friends</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <BiSolidMessageDetail className="icon" />
                        <span>Messages</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar