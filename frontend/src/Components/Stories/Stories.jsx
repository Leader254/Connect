/* eslint-disable react/jsx-key */
import '../../CSS/Stories.css'
import { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'

const Stories = () => {

    const { user } = useContext(AuthContext)

    // Temporary stories with dummy data with id name and image
    const stories = [
        {
            id: 1,
            name: 'John Doe',
            image: 'https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 2,
            name: 'Jane Doe',
            image: 'https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 3,
            name: 'John Doe',
            image: 'https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]

    return (
        <div className='stories'>
            <div className="story">
                <img src={user.profilePic} alt="" />
                <span>{user.username}</span>
                <button>+</button>
            </div>
            {stories.map((story) => (
                <div className="story" key={story.id}>
                    <img src={story.image} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories