import React from 'react'
import BELL_ICON from '../../assets/BELL_ICON.png'
import DATABASE_ICON from '../../assets/DATABASE_ICON.png'
import SEARCH3D_ICON from '../../assets/SEARCH3D_ICON.png'
import MANAGE_SYSTEM from '../../assets/MANAGE_SYSTEM.png'
import BACKEND_SYSTEM from '../../assets/BACKEND_SYSTEM.png'
// import MULTIPLE_LANGUAGE from '../../assets/MULTIPLE_LANGUAGE.png'
import MULTIPLE_LANGUAGE from '../../assets/lang_tw1.gif'
// import INTERNET_ICON from '../../assets/wifi.gif'
import INTERNET_ICON from '../../assets/WIFI_ANIM.webp'
import SLOT_MACHINE1 from '../../assets/slot_machine1.png'

import { useInView } from 'react-intersection-observer';


import "./searchSystem.css"
import { useTranslation } from 'react-i18next'
const SearchSystem = () => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: ref2, inView: inView2 } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: ref3, inView: inView3 } = useInView({ trackVisibility: true, delay: 100 });
    return (
        <div className='container'>
            <div className='search_hero'>
                <h3 className='search_description'>
                    {t('search_description_h3')}
                </h3>
                <h1 className='search_hero-title'>{t('search_description_h1')}</h1>
            </div>


            {/* APP SERVICE TEXT */}
            <div className={`search_service_text hidden ${inView ? 'show' : ' '}`} ref={ref}>
                <h2>{t('search_service_text_h2')}</h2>
                <p>{t('search_service_text_p')}</p>
            </div>

            {/* DIV MACHINE REVENUE */}
            <div className='search_revenue'>
                <div className='search_revenue_img'>
                    <img src={SLOT_MACHINE1} alt="" />
                </div>
                <div className='search_revenue_desc'>
                    <div className={`hidden ${inView2 ? 'show' : ' '}`} ref={ref2}>
                        <h2>{t('search_revenue_desc_h2_1')} <br /> {t('search_revenue_desc_h2_2')}</h2>
                        <p>{t('search_revenue_desc_p')}</p>
                    </div>
                </div>
            </div>

            {/* DIV MULTIPLE LANGUAGE */}
            <div className='search_language'>
                <div>
                    <h2>{t('search_language_h2')}</h2>
                    <p>{t('search_language_p')}</p>
                </div>
                <div className='search_language_img'>
                    <img className={`hidden ${inView3 ? 'show' : ' '}`} ref={ref3} src={MULTIPLE_LANGUAGE} alt="" />
                </div>
            </div>

            {/* DIV INTERNET */}
            <div className='search_internet'>
                <h2>{t('search_internet_h2')}</h2>
                <div className='search_internet_img'>
                    <img src={INTERNET_ICON} alt="" />
                </div>
                <p>{t('search_internet_p')}</p>
            </div>


            {/* div3 */}
            <div className='search_feature2'>
                <div className='ipick_feature_card ipick_card1'>
                    <h2>{t('ipick_feature_card_h2_1')}</h2>
                    <p>{t('ipick_feature_card_p_1')}</p>
                </div>
                <div className='ipick_feature_card ipick_card2'>
                    <h2>{t('ipick_feature_card_h2_2')}</h2>
                    <p>{t('ipick_feature_card_p_2')}</p>
                </div>
                <div className='ipick_feature_card ipick_card3'>
                    <h2>{t('ipick_feature_card_h2_3')}</h2>
                    <p>{t('ipick_feature_card_p_3')}</p>
                </div>
            </div>

            {/* DIV4 */}
            <div className='search_provide_content'>
                <h2>{t('search_provide_content')}</h2>
                <div className='search_provide_col'>
                    <div className='search_provide_card'>
                        <img src={BELL_ICON} alt="" />
                        <h3>{t('search_provide_card_h3_1')}</h3>
                        <p>{t('search_provide_card_p_1')}</p>
                    </div>
                    <div className='search_provide_card'>
                        <img src={DATABASE_ICON} alt="" />
                        <h3>{t('search_provide_card_h3_1')}</h3>
                        <p>{t('search_provide_card_p_2')}</p>
                    </div>
                    <div className='search_provide_card'>
                        <img src={SEARCH3D_ICON} alt="" />
                        <h3>{t('search_provide_card_h3_1')}</h3>
                        <p>{t('search_provide_card_p_3')}</p>
                    </div>
                </div>
            </div>

            {/* MANAGEMENT SYSTEM */}
            <div className='management_system_container'>
                <h2>{t('management_system_container')}</h2>
                <div className='management_system_img'>
                    <img src={MANAGE_SYSTEM} alt="" />
                </div>
            </div>

            {/* BACKEND SYSTEM */}
            <div className='backend_system_container'>
                <h2>{t('backend_system_container')}</h2>
                <div className='backend_system_img'>
                    <img src={BACKEND_SYSTEM} alt="" />

                </div>
            </div>
        </div>
    )
}

export default SearchSystem