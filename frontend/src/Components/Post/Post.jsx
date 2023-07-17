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
import { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'
import { apiDomain } from '../../utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Post = ({ post }) => {

    const { user } = useContext(AuthContext)


    const [commentView, setCommentView] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const makeRequest = axios.create({
        baseURL: apiDomain,
        withCredentials: true,
    });

    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest
            .get('/api/likes?postId=' + post.id)
            .then((res) => res.data)
    )
    // console.log(data)

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (liked) => {
            if (!liked) {
                return makeRequest.post("/api/likes", { postId: post.id });
            } else {
                return makeRequest.delete("/api/likes?postId=" + post.id);
            }
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    const handleLike = () => {
        mutation.mutate(
            data && data.includes(user.id)
        )
    }

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
                        {isLoading ? "loading" : data && data.includes(user.id) ? <AiFillLike className='icon' onClick={handleLike} /> : <BiLike className='icon' onClick={handleLike} />}
                        {data && data.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentView(!commentView)}>
                        <FaRegComments className='icon' />
                        {data && data.length} Comments
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