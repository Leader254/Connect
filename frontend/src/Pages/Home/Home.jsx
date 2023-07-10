import '../../CSS/Home.css'
import Posts from '../../Components/Posts/Posts'
import Stories from '../../Components/Stories/Stories'

const Home = () => {
  return (
    <div className='home'>
      <Stories />
      <Posts />
    </div>
  )
}

export default Home