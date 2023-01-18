import React from 'react'
import GALAXY_HERO from '../../assets/galaxy_hero.png'
import POLLY_WHITE from '../../assets/polly_white.png'
import CHAT_ICON from '../../assets/chat_icon.png'
import GRADIENT_RIGHT from '../../assets/gradient_right-min.webp'
import GALAXY_GAME1 from '../../assets/galaxy_game1.png'
import GALAXY_GAME2 from '../../assets/galaxy_game2.png'
import GALAXY_GAME3 from '../../assets/galaxy_game3.png'
import GALAXY_DOWNLOAD from '../../assets/galaxy_download.png'
import SLOT_MACHINE2 from '../../assets/slot_machine2.png'


import { SiAppstore } from 'react-icons/si'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import './galaxyCity.css'
import { useTranslation } from 'react-i18next'

import imgEn from '../../assets/flow_chart_en.png'
import imgTw from '../../assets/flow_chart_tw.png'
const GalaxyCity = () => {
    //translataion
    const { t } = useTranslation();


    // SCROLL VIEWER
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {

        const onScroll = (e) => {
            if (e.target.documentElement.scrollTop <= 2800) {
                setScrollValue(e.target.documentElement.scrollTop);
            };
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);

    }, [scrollValue]);

    const { ref: visibleRef, inView: elementIsVisible } = useInView();
    const { ref: visibleRef2, inView: elementIsVisible2 } = useInView();
    const { ref: visibleRefIOT, inView: elementIsVisibleIOT } = useInView();

    // RETURN DIV
    return (
        <div className='container'>
            <img className='gradient_right' src={GRADIENT_RIGHT} alt="" />
            <div className='galaxy_hero_content'>
                <h3 className='galaxy_tag'>{t('galaxy_tag')}</h3>
                <h1 className='galaxy_title'>{t('galaxy_title')}</h1>
                <img className='galaxy_hero_img' src={GALAXY_HERO} alt="" />
            </div>

            {/* FLOWCHART */}
            <div className='galaxy_flowchart'>
                <img className='galaxy_flowchart_img' src={
                    localStorage.getItem("i18nextLng") === "en" ? imgEn
                        : localStorage.getItem("i18nextLng") === "tw" ? imgTw : imgEn} alt="" />
            </div>

            {/* CONTENT1 */}
            <div className={`iot_content hidden ${elementIsVisibleIOT ? 'show' : ''}`} ref={visibleRefIOT}>
                <h1>{t('iot_content_h1')}</h1>
                <h2>{t('iot_content_h2')}</h2>
                <div className='galaxy_col2_5050'>
                    <div className='col_img_container'>
                        <img className='polly_white_img' src={POLLY_WHITE} style={{ transform: `rotate(${scrollValue * -0.3}deg) scale(${scrollValue / 900})` }} alt="" />
                    </div>
                    <div>
                        <p className='iot_desc1'>
                            {t('iot_desc1')}
                            <br /><br />
                            {t('iot_desc1_2')}
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTENT2 */}
            <div>
                <div className='galaxy_col2_4060'>
                    <div className='machine_desc_container'>
                        <h2 className='machine_title'>{t('machine_title')}</h2>
                        <p className='machine_desc'>{t('machine_desc')}</p>
                    </div>
                    <div className='col_img_container2'>
                        <img className='machine_img' src={SLOT_MACHINE2} alt="" />
                    </div>
                </div>
            </div>

            {/* CONTENT3 */}
            <div className='galaxy_game_container'>
                <h2>{t('galaxy_game_container_h2')}</h2>
                <p>
                    {t('galaxy_game_container_p')}
                </p>
                <div className='galaxy_col3'>
                    <div className='galaxy_game_img_container'>
                        <img src={GALAXY_GAME1} alt="" />
                    </div>
                    <div className='galaxy_game_img_container'>
                        <img src={GALAXY_GAME2} alt="" />
                    </div>
                    <div className='galaxy_game_img_container'>
                        <img src={GALAXY_GAME3} alt="" />
                    </div>
                </div>
            </div>



            {/* CONTENT4 */}
            <div className='galaxy_content4_container'>
                <div className='galaxy_col2'>
                    <div className='galaxy_social'>
                        <h2>{t('galaxy_social_h2')}</h2>
                        <p>{t('galaxy_social_p')}</p>
                    </div>
                    <div className='galaxy_video'>
                        <h2>{t('galaxy_video_h2')}</h2>
                        <p>{t('galaxy_video_p')}</p>

                    </div>
                </div>
            </div>

            {/* CONTENT TAGLINE */}
            <div className='galaxy_tagline_container'>
                <div className='module'>
                    <h2>
                        {t('module_h2')}
                    </h2>
                </div>
            </div>


            {/* CONTENT5 */}
            <div className='galaxy_content5_container'>
                <div className='galaxy_col2'>
                    <div className='galaxy_experience'>
                        <h2>{t('galaxy_experience_h2')}<br />{t('galaxy_experience_h2_2')}
                        </h2>
                        <img src={GALAXY_DOWNLOAD} alt="" />
                        <div className='galaxy_exp_btn_container'>
                            <button className={`btn btn-stroke btn_galaxy_stroke hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                                <a href="#0">
                                    <IoLogoGooglePlaystore className='button_icon_white' />Play Store
                                </a>
                            </button>
                            <button className={`btn btn-stroke btn_galaxy_stroke hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                                <a href="#0">
                                    <SiAppstore className='button_icon_white' />App Store
                                </a>
                            </button>
                        </div>

                    </div>
                    <div className='galaxy_contact'>
                        <h2>{t('galaxy_contact_h2')}</h2>
                        <img src={CHAT_ICON} alt="" />
                        <div className='galaxy_contact_btn_container'>
                            <button className={`btn btn-stroke hidden ${elementIsVisible2 ? 'show' : ''}`} ref={visibleRef2}>
                                <a href="mailto:cloudprogramingservice@gmail.com">
                                    {t('contact_us')}
                                </a>
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>


    )
}

export default GalaxyCity