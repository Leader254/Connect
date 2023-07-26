import './Navbar.css'
import { FaBell } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/authContext'
import { BiSolidMessageDetail } from 'react-icons/bi'


const Navbar = () => {

    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    const { user, dispatch } = useContext(AuthContext);

    const handleProfile = () => {
        setShowDropdown(!showDropdown);
    }
    const handleClick = () => {
        navigate(`/profile/${user.id}`);
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
                    <Link to='/chat'>
                        <BiSolidMessageDetail style={{ fontSize: '30px' }} />
                    </Link>
                    <FaBell style={{ fontSize: "30px" }} />
                    <div className="user">
                        <img src={user.profilePic} alt="" style={{ cursor: "pointer" }} onClick={handleProfile} />
                        {
                            showDropdown && (
                                <div className="dropdown">
                                    <ul className="links-to">
                                        <li onClick={handleClick}>
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

export default Navbar;
