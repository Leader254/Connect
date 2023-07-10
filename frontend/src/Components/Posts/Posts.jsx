import '../../CSS/Posts.css'
import Post from '../Post/Post'

const Posts = () => {

    // Testing dummy data
    const posts = [
        {
            id: 1,
            name: 'John Doe',
            userId: 1,
            profilePic: "https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4",
            desc: 'Love For All, Hatred For None.',
            img: "https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: 'Jane Doe',
            userId: 2,
            profilePic: "https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4",
            desc: 'Congratulations, you made it to another day, keep moving and keep coding all the time.',
            // img: "https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    ]

    return (
        <div className='posts'>
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Posts