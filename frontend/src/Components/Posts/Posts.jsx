import '../../CSS/Posts.css'
// import { makeRequest } from '../../utils/utils'
import { apiDomain } from '../../utils/utils'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Posts = () => {

    const makeRequest = axios.create({
        baseURL: apiDomain,
        withCredentials: true,
    });

    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest
            .get('/api/posts')
            .then((res) => res.data)
    )

    return (
        <div className='posts'>
            {error
                ? "Error Fetching posts"
                : isLoading
                    ? "loading"
                    : data.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
        </div>
    )
}

export default Posts