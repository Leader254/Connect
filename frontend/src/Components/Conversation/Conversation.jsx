/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/utils";

const Conversation = ({ data, currentUserId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (data) {

            const friendId = data.receiverId;
            // console.log("ReceiverId:", friendId);

            const getUser = async () => {
                try {
                    const data = await makeRequest.get('users/find/' + friendId);
                    // console.log(data.data);
                    setUserData(data.data);
                } catch (err) {
                    console.log(err);
                }
            }
            getUser();

            // Rest of the code to fetch user data and set it in the state...
        }
    },
        [data]
    );

    return (
        <>
            <div className="Conversation">
                <div>
                    <div className="follower conversation">
                        <div className="online-dot"></div>
                        <img src={userData?.profilePic} alt="" className="followerImage" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                        {/* {console.log(userData.profilePic)} */}
                        <div className="name" style={{ fontSize: "0.8rem" }}>
                            <span>{userData?.username}</span>
                            <span>Online</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )

};

export default Conversation;
