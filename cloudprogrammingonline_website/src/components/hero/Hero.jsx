import React from 'react'
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './hero.css'
const Hero = () => {
    const { t } = useTranslation();

    const { ref: visibleRef, inView: elementIsVisible } = useInView();
    return (
        <div className="container header__container">
            <h1 className='hero-title'>{t('home_hero_title')}</h1>
            <h2 className='hero-desc'>{t('home_hero_desc')}</h2>

            <h3 className='description'>
                {t('home_hero_description')}
            </h3>

            {/*  */}
            <a href='mailto:cloudprogramingservice@gmail.com'>
                <button className={`btn btn-fill-white glow-on-hover hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                    {t('contact_us')}
                </button>
            </a>
        </div>
    )
}

export default Hero