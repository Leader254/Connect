import './Navbar.css'
import { BiSolidMessageRoundedDetail } from 'react-icons/bi'
import { FaBell } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/authContext'


const Navbar = () => {

    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    const { user, dispatch } = useContext(AuthContext);

    const handleProfile = () => {
        console.log("Profile Clicked")
        setShowDropdown(!showDropdown)
    }

    const logout = () => {
        dispatch({ type: "logout" })
        navigate('/login')
    }

    return (
        <div className='navbar'>
            <div className="container">
                <div className="left">
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <span style={{ fontSize: "30px" }}>Connect.</span>
                    </Link>
                    <div className="search">
                        <BiSearchAlt className='searchIcon' />
                        <input type="text" placeholder='Search here...' />
                    </div>

                </div>
                <div className="right">
                    <Link to='/messenger'>
                        <BiSolidMessageRoundedDetail style={{ fontSize: '30px' }} />
                    </Link>
                    <FaBell style={{ fontSize: "30px" }} />
                    <div className="user">
                        <img src={user.profilePic} alt="" style={{ cursor: "pointer" }} onClick={handleProfile} />
                        {
                            showDropdown && (
                                <div className="dropdown">
                                    {/* <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>  <span className="dropdownItem">Profile</span></Link> */}
                                    <ul className="links-to">
                                        <li>
                                            Profile
                                        </li>
                                        <li onClick={logout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                        <span className='username'>{user.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar