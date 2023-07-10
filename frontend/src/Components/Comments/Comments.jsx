import '../../CSS/Comments.css'
import { AuthContext } from '../../Context/authContext'
import { useContext } from 'react'
import { BsFillSendFill } from 'react-icons/bs'

const Comments = () => {

    const { currentuser } = useContext(AuthContext)

    const comments = [
        {
            id: 1,
            desc: "Informative article son, i like how you progress.",
            name: 'Grace Nduta',
            userId: 1,
            profilePic: "https://images.pexels.com/photos/16961306/pexels-photo-16961306/free-photo-of-fashion-person-people-woman.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            desc: "I like how you structure your folders nowadays, simple and easy to understand.",
            name: 'Mark Wahome',
            userId: 2,
            profilePic: "https://images.pexels.com/photos/7148455/pexels-photo-7148455.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
    ]
    return (
        <div className='comments'>
            <div className="new">
                <img src={currentuser.profilePic} alt="" />
                <div className="text">
                    <input type="text" placeholder='Write a comment...' />
                    <BsFillSendFill style={{ cursor: "pointer" }} />
                </div>
            </div>
            {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="replies">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                        <hr className='line' />
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments