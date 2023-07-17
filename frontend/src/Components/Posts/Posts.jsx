/* eslint-disable react/prop-types */
import '../../CSS/Posts.css'
import { makeRequest } from '../../utils/utils'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'

const Posts = ({ userId }) => {

    // const makeRequest = axios.create({
    //     baseURL: apiDomain,
    //     withCredentials: true,
    // });

    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest
            .get('/posts?userId=' + userId)
            .then((res) => res.data)
    )

    return (
        <div className='posts'>
            {error
                ? "Error Fetching posts"
                : isLoading
                    ? "Loading"
                    : data.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
        </div>
    )
}

export default Posts