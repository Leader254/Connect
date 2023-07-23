import '../../CSS/Profile.css'
import { useContext, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { VscLocation } from 'react-icons/vsc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { makeRequest } from '../../utils/utils';
import Update from '../../Components/Update/Update';
import Posts from '../../Components/Posts/Posts';
import { BiSolidMessageDetail } from 'react-icons/bi';

const Profile = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get('/users/find/' + userId).then((res) => res.data)
  );

  const { isLoading: relationshipLoading, data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get('/relationships?followedUserId=' + userId).then((res) => res.data)
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (following) => {
      if (!following) {
        return makeRequest.post("/relationships", { userId });
      } else {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData && relationshipData.includes(user.id));
  };

  return (
    <div className='profile'>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="images">
            <img src={data && data.coverPic} alt="No Cover Pic For this profile" className='cover' />
            <img src={data && data.profilePic} alt="" className='profilepic' />
          </div>
          <div className="profile-container">
            <div className="user-info">
              <div className="left">
                <p>
                  {data && data.bio}
                </p>
              </div>
              <div className="center">
                <span>{data && data.fullname}</span>
                <div className="info">
                  <div className="item" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <VscLocation />
                    <span style={{ fontSize: "15px" }}>{data && data.country}</span>
                  </div>
                </div>
                {relationshipLoading ? "Loading" : (
                  userId === user.id ? (
                    <button onClick={() => setShowUpdate(true)} style={{ cursor: "pointer" }}>Update</button>
                  ) : (
                    <button className='follow-profile' onClick={handleFollow}>
                      {relationshipData && relationshipData.includes(user.id) ? "Unfollow" : "Follow"}
                    </button>
                  )
                )}
              </div>
              <div className="right">
                <Link to='/messenger'>
                  <BiSolidMessageDetail style={{ fontSize: '30px', cursor: "pointer" }} />
                </Link>
                <FiMoreHorizontal style={{ fontSize: "25px" }} />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {showUpdate && <Update setOpenUpdate={setShowUpdate} user={data} />}
    </div>
  );
};

export default Profile;
