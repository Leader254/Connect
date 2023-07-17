import { useEffect, useState } from 'react'
import '../../CSS/rightBar.css'
import axios from 'axios'
import { apiDomain } from '../../utils/utils'

const RightBar = () => {

  const [suggestedFriends, setSuggestedFriends] = useState([])

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      const res = await axios.get(`${apiDomain}/api/users/suggested`)
        .then(res => res.data)
      setSuggestedFriends(res)
      // setSuggestedFriends(res.data)
      console.log(res.data)
    }
    fetchSuggestedFriends()
  }, [])

  return (
    <div className='rightbar'>
      <div className="container3">
        <div className="item">
          <span style={{ color: "lightgray" }}>Suggested for you</span>
          {/* <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <span>Samuel Wachira</span>
            </div>
            <div className="action-btns">
              <button className='follow'>Follow</button>
              <button className='dismiss'>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <span>Janet Wamuyu</span>
            </div>
            <div className="action-btns">
              <button className='follow'>Follow</button>
              <button className='dismiss'>Dismiss</button>
            </div>
          </div> */}
          {suggestedFriends.map(user => (
            <div className="user" key={user.id}>
              <div className="userInfo">
                <img src={user.profilePic} alt={user.name} />
                <span>{user.fullname}</span>
              </div>
              <div className="action-btns">
                <button className='follow'>Follow</button>
                <button className='dismiss'>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span style={{ color: "lightgray" }}>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <p>
                <span>Samuel Wachira</span> commented on your post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <p>
                <span>Samuel Wachira</span> commented on your post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <p>
                <span>Samuel Wachira</span> commented on your post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <p>
                <span>Samuel Wachira</span> commented on your post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span style={{ color: "lightgray" }}>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <div className="online" />
              <span>Samuel Wachira</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar