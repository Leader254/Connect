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

const Profile = () => {
  return (
    <div className='profile'>
      <div className="images">
        <img src="https://images.pexels.com/photos/3429058/pexels-photo-3429058.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className='cover' />
        <img src="https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4" alt="" className='profilepic' />
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
            <span>Jane Doe</span>
            <div className="info">
              <div className="item" style={{ display: "flex", align: "Itemscenter", justifyContent: "center" }}>
                <VscLocation />
                <span style={{ fontSize: "15px" }}>Kenya</span>
              </div>
            </div>
            <button className='follow-profile'>Follow</button>
          </div>
          <div className="right">
            <FiMail style={{ fontSize: "25px" }} />
            <FiMoreHorizontal style={{ fontSize: "25px" }} />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  )
}

export default Profile