import CLOUD3D from '../../assets/cloud3d-min.webp'
import PURPLE_GRADIENT from '../../assets/purple_gradient-min.webp'
import Hero from './Hero'
import RecentProject from './RecentProject'
import Service from './Service'
import './home.css'

const Home = () => {
    return (
        <div>
            <img src={PURPLE_GRADIENT} className="purple_gradient" alt="" />
            <img src={CLOUD3D} className="background_cloud" alt="me" />
            <Hero />
            <RecentProject />
            <Service />
        </div>
    )
}

export default Home