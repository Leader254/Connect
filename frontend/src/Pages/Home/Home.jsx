import '../../CSS/Home.css'
import Posts from '../../Components/Posts/Posts'
import Share from '../../Components/Share/Share'
// import Stories from '../../Components/Stories/Stories'

const Home = () => {
  return (
    <div className='home'>
      {/* <Stories /> */}
      <Share />
      <Posts />
    </div>
  )
}

export default Home