/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import '../../CSS/Post.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiLike } from 'react-icons/bi'
import { AiFillLike } from 'react-icons/ai'
import { FaRegComments } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import Comments from '../Comments/Comments'
import { useState } from 'react'

const Post = ({ post }) => {

    const [commentView, setCommentView] = useState(false)

    const liked = false;

    return (
        <div className='post'>
            <div className="postwrapper">
                <div className="user">
                    <div className="userDetails">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">1 day ago</span>
                        </div>
                    </div>
                    <FiMoreHorizontal />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
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
                {commentView && < Comments />}
            </div>
        </div>
    )
}

export default Post