import React from 'react'
import './line.css'
import IMG1 from '../../assets/line1.png'
import IMG2 from '../../assets/line2.png'
import IMG3 from '../../assets/line3.png'
import IMG4 from '../../assets/line4.png'
import LINE_SPECIALTY from '../../assets/我們的特色.png'
import LINE_SERVICE from '../../assets/line_service_img.png'
import LINE_HERO from '../../assets/line_hero.png'
import LINE_INTRO from '../../assets/line_intro.png'
import SEARCH_ICON from '../../assets/search_icon.png'
import VERIFIED_ICON from '../../assets/verified_icon.png'
import MEDAL_ICON from '../../assets/MEDAL_ICON.png'
import LINE_INTRO_HORIZONTAL from '../../assets/line_intro_horizontal.png'

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const Line = () => {
    const { t } = useTranslation();
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {

        const onScroll = (e) => {
            setScrollValue(e.target.documentElement.scrollTop);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);

    }, [scrollValue]);


    return (
        <div className='container' >
            {/* HERO SECTION */}
            <div className='line_header_container'>
                <img className='line_hero_img' src={LINE_HERO} alt="" />
                <div className='line_hero_container'>
                    <h1 className='line_hero_title'>{t('line_hero_title')}</h1>
                    <h2 className='line_hero_title2'>{t('line_hero_title_2')}</h2>
                    <h3 className='line_hero_description'>
                        {t('line_hero_description')}
                    </h3>
                </div>

            </div>


            {/* LINE INTRODUCTION */}
            <div className='line_intro_container'>
                <div className='line_intro_horizontal'>
                    <img src={LINE_INTRO_HORIZONTAL} alt="" />
                </div>
                {/* <h3 className='line_title'>產品介紹</h3> */}

                <div className='line_container_3'>
                    <div className=''>
                        <div className="line_card">
                            <img className='line_card_img' src={IMG1} alt="" />
                            <h3>{t('line_card_h3_1')}</h3>
                            <p>{t('line_card_p_1')}</p>
                        </div>
                        <div className="line_card">
                            <img className='line_card_img' src={IMG2} alt="" />
                            <h3>{t('line_card_h3_2')}</h3>
                            <p>{t('line_card_p_2')}</p>
                        </div>
                    </div>

                    <div className='line_intro_img_container'>
                        {/* <h3 className='line_title vertical'>產品介紹</h3> */}
                        <img className='line_intro_img' src={LINE_INTRO} alt="" />
                    </div>

                    <div className=''>
                        <div className="line_card">
                            <img className='line_card_img' src={IMG3} alt="" />
                            <h3>{t('line_card_h3_3')}</h3>
                            <p>{t('line_card_p_3')}</p>
                        </div>
                        <div className="line_card">
                            <img className='line_card_img' src={IMG4} alt="" />
                            <h3>{t('line_card_h3_4')}</h3>
                            <p>{t('line_card_p_4')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* LINE SPECIAL */}
            <div className='line_special'>
                {/*  */}
                <div className='line_scroll_container'>
                    <img className='line_specialty_img' src={LINE_SPECIALTY} style={{ transform: `translateX(${scrollValue * -0.25}px)` }} alt='' />
                </div>
                <div className='line_special_content'>
                    <div className='line_special_desc'>
                        <h3>{t('line_special_desc_h3_1')}</h3>
                        <p>{t('line_special_desc_p_1')}</p>
                    </div>

                    <div className='line_special_img'>
                        <img src={MEDAL_ICON} alt="" />
                    </div>
                </div>
            </div>

            {/* LINE SERVICE */}
            <div className='line_service'>
                <div>
                    <img className='line_service_img' src={LINE_SERVICE} style={{ transform: `translateX(${scrollValue * 0.22}px)` }} alt='' />
                </div>
                <div className='column_2'>
                    <div className='line_service_card'>
                        <div className='line_service_card_top'>
                            <h3>{t('line_service_card_top_h3_1')}</h3>
                            <img className='line_service_icon' src={SEARCH_ICON} alt="" />
                        </div>

                        <p>{t('line_service_card_top_p_1')}
                        </p>
                    </div>

                    <div className='line_service_card'>
                        <div className='line_service_card_top'>
                            <h3>{t('line_service_card_top_h3_2')}</h3>
                            <img className='line_service_icon' src={VERIFIED_ICON} alt="" />
                        </div>
                        <p>
                            {t('line_service_card_top_p_2')}
                        </p>
                    </div>
                </div>


            </div>

        </div>

    )
}

export default Line