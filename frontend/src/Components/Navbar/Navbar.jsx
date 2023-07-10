import './Navbar.css'
import { BiSolidMessageRoundedDetail } from 'react-icons/bi'
import { BsMoon } from 'react-icons/bs'
import { FaBell } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'

const Navbar = () => {

    const { currentuser } = useContext(AuthContext);

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
                    <BsMoon style={{ fontSize: "30px" }} />
                    <BiSolidMessageRoundedDetail style={{ fontSize: "30px" }} />
                    <FaBell style={{ fontSize: "30px" }} />
                    <div className="user">
                        <img src={currentuser.profilePic} alt="" />
                        <span className='username'>{currentuser.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar