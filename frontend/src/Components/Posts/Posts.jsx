/* eslint-disable react/prop-types */
import '../../CSS/Posts.css'
import { makeRequest } from '../../utils/utils'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'

const Posts = ({ userId }) => {

    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest
            .get('/posts?userId=' + userId)
            .then((res) => res.data)
    )
    console.log(data)

    return (
        <div className='posts'>
            {error ? (
                'Error Fetching posts'
            ) : isLoading ? (
                'Loading'
            ) : data.length === 0 ? (
                <p>You have no posts yet</p>
            ) : (
                data.map((post, index) => (
                    <Post post={post} key={`${post.id}-${index}`} />
                ))
            )}
        </div>
    );

}

export default Posts
