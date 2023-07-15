import { FaUserFriends } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import '../../CSS/leftBar.css'
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

const LeftBar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="leftbar">
            <div className="container1">
                <div className="menu">
                    <div className="user">
                        <img src={user.profilePic} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <div className="item">
                        <FaUserFriends className='icon' />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <MdOutlineGroups className='icon' />
                        <span>Groups</span>
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
                <hr />
                {/* User Profile */}
                <div className="menu">
                    <span>Your Profile</span>
                    <div className="item">
                        <FaUserCircle className="icon" />
                        {/* <img src={user.profilePic} alt="" /> */}
                        <span>Profile</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar