import { useMediaQuery } from 'react-responsive'
import CLOUD3D from '../../assets/cloud3d-min.webp'
// import PURPLE_GRADIENT from '../../assets/purple_gradient-min.webp'
import Hero from './Hero'
import RecentProject from './RecentProject'
import Service from './Service'
import './home.css'

const Home = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <div >
            <div className='purple_gradient'></div>
            {!isMobile && (
                <img src={CLOUD3D} className="background_cloud" alt="me" />
            )}
            <Hero />
            <RecentProject />
            <Service />
        </div>
    )
}

export default Home