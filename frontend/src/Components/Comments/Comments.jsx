/* eslint-disable react/prop-types */
import '../../CSS/Comments.css'
import { AuthContext } from '../../Context/authContext'
import { useContext, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FiMoreHorizontal } from 'react-icons/fi'
import axios from 'axios'
import { apiDomain } from '../../utils/utils'
import moment from 'moment'
import { BiSolidPencil } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'

const Comments = ({ postId }) => {

    const [description, setDescription] = useState("")
    const [showDropdown, setShowDropdown] = useState({})

    const { user } = useContext(AuthContext)

    let makeRequest = axios.create({
        baseURL: apiDomain,
        withCredentials: true,
    });

    const { isLoading, data } = useQuery(['comments'], () =>
        makeRequest
            .get("/api/comments?postId=" + postId)
            .then((res) => res.data)

    );
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/api/comments", newComment,
            );
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );
    const handleComment = async (e) => {
        e.preventDefault();
        const postComment = {
            description: description,
            postId: postId,
        };
        mutation.mutate(postComment);
        console.log(postComment)
        setDescription("");
    };

    const getUsername = (comment) => {
        if (user.id === comment.userId) {
            return "by you"
        } else {
            return comment.fullname
        }
    }

    // FUnction to toggle the dropdown for each comment
    const handleMore = (commentId) => {
        setShowDropdown((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const handleDelete = async (comment) => {
        try {

            const confirm = window.confirm("Are you sure you want to delete this comment?");
            if (confirm) {
                const response = await axios.delete(`${apiDomain}/api/comments/${comment.id}`); // Fix the API URL to '/api/comments/'
                if (response.status === 200) {
                    toast.success("Post Deleted Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                        autoclose: 1000,
                    });
                    window.location.reload();
                } else {
                    console.log("Error Deleting Post");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Error Deleting Post");
        }
    };


    return (
        <div className='comments'>
            <div className="new">
                <img src={user.profilePic} alt="" />
                <div className="text">
                    <input type="text" placeholder='Write a comment...' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <BsFillSendFill style={{ cursor: "pointer" }} onClick={handleComment} />
                </div>
            </div>
            {isLoading ? "loading" : data.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="replies">
                        <p>{comment.description}</p>
                        <hr className='line' />
                    </div>
                    <span className='date'>{
                        moment(comment.createdAt).fromNow()
                    }
                        <br />
                        {getUsername(comment)}
                    </span>
                    <FiMoreHorizontal style={{ cursor: "pointer" }} onClick={() => handleMore(comment.id)} /> {/* Pass the comment ID to toggle its dropdown */}
                    {showDropdown[comment.id] && ( // Check the corresponding state for the dropdown
                        <div className='dropdown-comment'>
                            <ul>
                                <li>
                                    <BiSolidPencil />
                                    Edit
                                </li>
                                <li onClick={() => handleDelete(comment)} >
                                    <MdDelete style={{ color: "red" }} />
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Comments;
