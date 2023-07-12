import '../../CSS/Posts.css'
// import { makeRequest } from '../../utils/utils'
import { apiDomain } from '../../utils/utils'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Posts = () => {

    const { isLoading, error, data } = useQuery(['posts'], () =>

        // axios
        axios.get(`${apiDomain}/api/posts`)
            .then((res) => {
                console.log(data)
                return res.data
            })
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