import ABOUT_FLOW from '../../assets/about_flow.png'
import ABOUT_BG2 from '../../assets/about_bg2.png'


import "./about.css"
import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation();
    return (
        <div>
            {/* HERO */}
            <img src={ABOUT_BG2} className="about_background_cloud" alt="me" />
            <div className="about_hero" >
                <h1 className='text-[7rem] font-bold text-center'>{t('about_hero_h1')}</h1>
                <p className='text-center mt-6 mx-24'>{t('about_hero_h2')}</p>
            </div>
            <div className='mb-20'>
                <h2 className='text-[4rem] font-bold text-center'>{t('about_flow')}</h2>
                <div className='about_flow_img'>
                    <img src={ABOUT_FLOW} alt="" />
                </div>
            </div>

        </div>
    )


}

export default About