import React from 'react'
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
                <h1>{t('about_hero_h1')}</h1>
                <h2>{t('about_hero_h2')}</h2>
            </div>
            <div className='about_flow'>
                <h2>{t('about_flow')}</h2>
                <div className='about_flow_img'>
                    <img src={ABOUT_FLOW} alt="" />
                </div>

            </div>

        </div>
    )


}

export default About