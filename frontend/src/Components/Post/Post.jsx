/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom'
import '../../CSS/Post.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiLike } from 'react-icons/bi'
import { AiFillLike } from 'react-icons/ai'
import { FaRegComments } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import Comments from '../Comments/Comments'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { BiSolidPencil } from 'react-icons/bi'
import moment from "moment"
import axios from 'axios'
import { apiDomain } from '../../utils/utils'

const Post = ({ post }) => {

    const [commentView, setCommentView] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const liked = false;

    const handleMore = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
        // console.log("More button Clicked")
    }

    const handleDelete = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this post?");
            if (confirm) {
                console.log("Deleting Post")
                const response = await axios.delete(`${apiDomain}/api/posts/${post.id}`)
                if (response.status === 200) {
                    console.log("Post Deleted")
                    window.location.reload()
                }
                else {
                    console.log("Error Deleting Post")
                }
            }

        } catch (error) {
            console.log(error)
            alert("Error Deleting Post")
        }


    }

    const handleEdit = () => {
        navigate(`/update/${post.id}`)
        console.log("Edit Post")
    }

    return (
        <div className='post'>
            <div className="postwrapper">
                <div className="user">
                    <div className="userDetails">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.fullname}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <FiMoreHorizontal style={{ cursor: "pointer" }} onClick={handleMore} />
                    {showDropdown && (
                        <div className="dropdown">
                            <ul>
                                <li onClick={handleEdit}>
                                    <BiSolidPencil />
                                    Edit Post
                                </li>
                                <li onClick={handleDelete} >
                                    <MdDelete />
                                    Delete Post
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <img src={post.image} alt="" />
                </div>
                <div className="interactions">
                    <div className="item">
                        {liked ? <AiFillLike className='icon' /> : <BiLike className='icon' />}
                        20 Likes
                    </div>
                    <div className="item" onClick={() => setCommentView(!commentView)}>
                        <FaRegComments className='icon' />
                        20 Comments
                    </div>
                    <div className="item">
                        <FiShare2 />
                        Share
                    </div>
                </div>
                {commentView && < Comments postId={post.id} />}
            </div>
        </div>
    )
}

export default Post