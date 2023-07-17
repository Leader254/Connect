import '../../CSS/Profile.css'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { VscLocation } from 'react-icons/vsc'
import { FiMoreHorizontal } from 'react-icons/fi'
import Posts from '../../Components/Posts/Posts'
// import { apiDomain } from '../../utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/authContext'
import { makeRequest } from '../../utils/utils'
import Update from '../../Components/Update/Update'

const Profile = () => {

  const [showUpdate, setShowUpdate] = useState(false)

  const { user } = useContext(AuthContext)

  const userId = parseInt(useLocation().pathname.split("/")[2])

  // let makeRequest = axios.create({
  //   baseURL: apiDomain,
  //   withCredentials: true,
  // });

  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest
      .get('/users/find/' + userId)
      .then((res) => res.data)
  )
  // console.log(data);

  const { isLoading: relationshipLoading, data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest
      .get('/relationships?followedUserId=' + userId)
      .then((res) => res.data)
  )
  console.log(relationshipData);

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
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(
      relationshipData && relationshipData.includes(user.id)
    )
  }

  return (
    <div className='profile'>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data && data.coverPic} alt="" className='cover' />
            <img src={data && data.profilePic} alt="" className='profilepic' />
          </div>
          <div className="profile-container">
            <div className="user-info">
              <div className="left">
                <a href="facebook.com">
                  <FaFacebook className='icon' />
                </a>
                <a href="instagram.com">
                  <FaInstagram className='icon' />
                </a>
                <a href="twitter.com">
                  <FaTwitter className='icon' />
                </a>
                <a href="linkedin.com">
                  <FaLinkedin className='icon' />
                </a>
                <a href="github.com">
                  <FaGithub className='icon' />
                </a>
              </div>
              <div className="center">
                <span>{data && data.fullname}</span>
                <div className="info">
                  <div className="item" style={{ display: "flex", align: "Itemscenter", justifyContent: "center" }}>
                    <VscLocation />
                    <span style={{ fontSize: "15px" }}>{data && data.country}</span>
                  </div>
                </div>
                {relationshipLoading ? "Loading" : userId === user.id ? <button onClick={() => setShowUpdate(true)}>Update</button> : <button className='follow-profile' onClick={handleFollow}>
                  {relationshipData && relationshipData.includes(user.id) ? "Unfollow" : "Follow"}
                </button>}
              </div>
              <div className="right">
                <FiMail style={{ fontSize: "25px" }} />
                <FiMoreHorizontal style={{ fontSize: "25px" }} />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {showUpdate && <Update setShowUpdate={setShowUpdate} user={data} />}
    </div >
  )
}

export default Profile