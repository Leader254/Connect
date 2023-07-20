import { useEffect, useState } from 'react';
import { makeRequest } from '../../utils/utils';
import '../../CSS/rightBar.css';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../Context/authContext';

const RightBar = () => {
  // const { user } = useContext(AuthContext);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      const res = await makeRequest.get('/users/suggested')
        .then((res) => res.data);
      setSuggestedFriends(res);
    };

    fetchSuggestedFriends();
  }, []); // Empty dependency array to fetch suggested friends only once

  const refetchSuggestedFriends = async () => {
    const res = await makeRequest
      .get('/users/suggested')
      .then((res) => res.data);
    setSuggestedFriends(res);
  };

  const handleFollow = async (userId) => {
    await makeRequest
      .post('/relationships', { userId })
      .then(() => {
        refetchSuggestedFriends();

      })
      .catch((error) => {
        console.log('Error following user:', error);
      });
  };

  const handleUserInfoClick = () => {
    window.location.reload(); // Reload the page when userInfo is clicked
  };

  return (
    <div className="rightbar">
      <div className="container3">
        <div className="item">
          <span style={{ color: 'black' }}>Suggested for you</span>
          {suggestedFriends.map((user) => (
            <div className="user" key={user.id}>
              <div className="userInfo" onClick={handleUserInfoClick}>
                <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={user.profilePic} alt={user.username} />
                  <span>{user.fullname}</span>
                </Link>
              </div>
              <div className="action-btns">
                <button className="follow" onClick={() => handleFollow(user.id)}>
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
