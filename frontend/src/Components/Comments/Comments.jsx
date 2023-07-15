/* eslint-disable react/prop-types */
import '../../CSS/Comments.css'
import { AuthContext } from '../../Context/authContext'
import { useContext, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { apiDomain } from '../../utils/utils'
import moment from 'moment'

const Comments = ({ postId }) => {

    const [description, setDescription] = useState("")

    const { user } = useContext(AuthContext)

    const makeRequest = axios.create({
        baseURL: apiDomain,
        withCredentials: true,
    });

    const { isLoading, error, data } = useQuery(['comments'], () =>
        makeRequest
            .get("/api/comments?postId=" + postId)
            .then((res) => res.data)

    );
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return axios.post(`${apiDomain}/api/comments`, newComment);
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
        const comment = {
            description: description,
            postId: postId,
        };
        mutation.mutate(comment);
        console.log(comment)
        setDescription("");
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
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                        <hr className='line' />
                    </div>
                    <span className='date'>{
                        moment(comment.createdAt).fromNow()
                    }</span>
                </div>
            ))}
        </div>
    )
}

export default Comments