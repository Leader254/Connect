import { BiSolidMessageDetail } from "react-icons/bi";
import '../../CSS/leftBar.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { makeRequest } from "../../utils/utils";
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [randomFriends, setRandomFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRandomFriends = async () => {
            const res = await makeRequest.get('/users/friends')
                .then((res) => res.data);
            setAllFriends(res); // Save all friends to the state
            setRandomFriends(res.slice(0, 5)); // Display only the first 5 random friends
        };

        fetchRandomFriends();
    }, []);

    const handleLogout = () => {
        dispatch({ type: "logout" })
        navigate('/login')
    }

    return (
        <div className="leftbar">
            <div className="container1">
                <div className="menu">
                    <div className="user">
                        <img src={user.profilePic} alt="" />
                        <span>{user.username}</span>
                    </div>
                </div>
                <br />
                <div className="menu">
                    <div className="item">
                        <BiSolidMessageDetail className="icon" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu friends">
                    <div className="item">
                        <span style={{ textDecoration: "underline" }}>Your Friends</span>
                    </div>
                    {randomFriends.map((friend) => (
                        <div className="item" key={friend.id}>
                            <img src={friend.profilePic} alt="" className="icon" />
                            <span>{friend.username}</span>
                        </div>
                    ))}
                    <div className="friends-count">You have {allFriends.length} friends</div>
                </div>
                <div className="menu logout">
                    <div className="item">
                        <RiLogoutCircleRLine className="icon" />
                        <span style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;



// import { BiSolidMessageDetail } from "react-icons/bi";
// import '../../CSS/leftBar.css';
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Context/authContext";
// import { makeRequest } from "../../utils/utils";
// import { RiLogoutCircleRLine } from 'react-icons/ri'
// import { useNavigate } from "react-router-dom";

// const LeftBar = () => {
//     const { user, dispatch } = useContext(AuthContext);
//     const [randomFriends, setRandomFriends] = useState([]);
//     const [allFriends, setAllFriends] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRandomFriends = async () => {
//             const res = await makeRequest.get('/users/friends')
//                 .then((res) => res.data);
//             setAllFriends(res); // Save all friends to the state
//             setRandomFriends(res.slice(0, 5)); // Display only the first 5 random friends
//         };

//         fetchRandomFriends();
//     }, []);

//     const handleLogout = () => {
//         dispatch({ type: "logout" })
//         navigate('/login')
//     }

//     return (
//         <div className="leftbar">
//             <div className="container1">
//                 <div className="menu">
//                     <div className="user">
