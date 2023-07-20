import config from "../db/config";
import nodeMailer from "nodemailer";
const { mail_password } = config;

const nodeMailer = require("nodemailer");

exports.sendFollowEmail = async (req, res) => {
  const { userEmail } = req.body;

  try {
    // Send email notification to the user when they are followed
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "samuelwachira@gmail.com",
        pass: mail_password,
      },
    });

    let mailOptions = {
      from: "followeremail@gmail.com",
      to: userEmail,
      subject: "New Follower Notification",
      html: `<p>You have a new follower!</p>
        <p>Follower's Email: ${userEmail}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ error: "Error sending email." });
      } else {
        console.log("Email notification sent:", info.response);
        return res
          .status(200)
          .json({ message: "Email notification sent successfully!" });
      }
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).json({ error: "Error sending email." });
  }
};

//Frontend

// import { useEffect, useState } from 'react';
// import { makeRequest } from '../../utils/utils';
// import '../../CSS/rightBar.css';

// const RightBar = () => {
//   const [suggestedFriends, setSuggestedFriends] = useState([]);

//   useEffect(() => {
//     fetchSuggestedFriends();
//   }, []);

//   const fetchSuggestedFriends = async () => {
//     try {
//       const res = await makeRequest.get('/users/suggested');
//       setSuggestedFriends(res.data);
//     } catch (error) {
//       console.log('Error fetching suggested friends:', error);
//     }
//   };

//   const handleFollow = async (userId, userEmail) => {
//     try {
//       await makeRequest.post('/relationships', { userId });
//       sendFollowNotification(userEmail);
//       refetchSuggestedFriends();
//     } catch (error) {
//       console.log('Error following user:', error);
//     }
//   };

//   const sendFollowNotification = async (userEmail) => {
//     try {
//       await makeRequest.post('/send-follow-email', { userEmail });
//       console.log('Email notification sent successfully!');
//     } catch (error) {
//       console.log('Error sending email notification:', error);
//     }
//   };

//   const refetchSuggestedFriends = async () => {
//     try {
//       const res = await makeRequest.get('/users/suggested');
//       setSuggestedFriends(res.data);
//     } catch (error) {
//       console.log('Error fetching suggested friends:', error);
//     }
//   };

//   return (
//     <div className="rightbar">
//       <div className="container3">
//         <div className="item">
//           <span style={{ color: 'black' }}>Suggested for you</span>
//           {suggestedFriends.map((user) => (
//             <div className="user" key={user.id}>
//               <div className="userInfo">
//                 <img src={user.profilePic} alt={user.name} />
//                 <span>{user.fullname}</span>
//               </div>
//               <div className="action-btns">
//                 <button className="follow" onClick={() => handleFollow(user.id, user.email)}>
//                   Follow
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ... Online friends to be implemented */}
//       </div>
//     </div>
//   );
// };

// export default RightBar;
