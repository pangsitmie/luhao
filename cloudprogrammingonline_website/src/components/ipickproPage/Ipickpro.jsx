import React from 'react'
import YoutubeEmbed from '../youtubeEmbed/YoutubeEmbed'

import { SiAppstore } from 'react-icons/si'


// import GALAXY_GRADIENT from '../../assets/galaxy_gradient-min.webp'
// import IPICKPRO_HERO from '../../assets/ipickpro_hero.png'
import IPICK_FEATURE1 from '../../assets/ipick_feature1.png'
import IPICK_FEATURE2 from '../../assets/IPICK_FEATURE2.png'
import IPICK_FEATURE3 from '../../assets/IPICK_FEATURE3.png'
import IPICK_FEATURE4 from '../../assets/IPICK_FEATURE4.png'


import './ipickpro.css'
import { useTranslation } from 'react-i18next'

const IPickPro = () => {
    const { t } = useTranslation();
    return (
        <div className='container'>
            {/* HERO IPICKPRO */}
            <div className='hero_ipickpro'>
                {/* <img className='center_gradient' src={GALAXY_GRADIENT} alt='' /> */}
                {/* <img className='hero_img' src={IPICKPRO_HERO} alt='' /> */}

                <h1>iPick Pro</h1>
                <div className='ipick_hero_btn_container'>

                    <a href="https://apps.apple.com/tw/app/ipickpro/id1414137182?l=en">
                        <button className={"btn glow-on-hover"}>
                            <SiAppstore className='button_icon' />App Store
                        </button>
                    </a>
                </div>
            </div>

            {/* VIDEO */}
            <div className='ipick_video'>
                <div className="App">
                    <YoutubeEmbed embedId="wV-AOqiAuuU" />
                </div>
                <div className="App">
                    <YoutubeEmbed embedId="aWepvLsbejg" />
                </div>
            </div>

            {/* div3 */}
            <div className='ipick_feature1'>
                <h2>{t('ipick_feature1_h2')}</h2>
                <p>{t('ipick_feature1_p')}</p>
                <img src={IPICK_FEATURE1} alt="" />
            </div>

            {/* DIV4 */}
            <div className='ipick_feature2'>
                <div className='ipick_feature_card ipick_card1'>
                    <h2>{t('ipick_feature2_h2_1')}</h2>
                    <p>{t('ipick_feature2_p_1')}</p>
                    <div className='ipick_feature_card_img_container'>
                        <img src={IPICK_FEATURE2} alt="" />
                    </div>
                </div>
                <div className='ipick_feature_card ipick_card2'>
                    <h2>{t('ipick_feature2_h2_2')}</h2>
                    <p>{t('ipick_feature2_p_2')}</p>
                    <div className='ipick_feature_card_img_container'>
                        <img src={IPICK_FEATURE3} alt="" />
                    </div>
                </div>
                <div className='ipick_feature_card ipick_card3'>
                    <h2>{t('ipick_feature2_h2_3')}</h2>
                    <p>{t('ipick_feature2_p_3')}</p>
                    <div className='ipick_feature_card_img_container'>
                        <img src={IPICK_FEATURE4} alt="" />
                    </div>
                </div>
            </div>

            {/* DIV5 */}
            <div className='ipick_advantage'>
                <h2>{t('ipick_advantage')}</h2>
                <div className='ipick_advantage_col'>
                    <div>
                        <div className='ipick_advantage_item'>
                            <h3>{t('ipick_advantage_item_h3_1')}</h3>
                            <p>{t('ipick_advantage_item_p_1')}</p>
                        </div>
                        <div className='ipick_advantage_item'>
                            <h3>{t('ipick_advantage_item_h3_2')}</h3>
                            <p>{t('ipick_advantage_item_p_2')}</p>
                        </div>

                    </div>
                    <div >
                        <div className='ipick_advantage_item'>
                            <h3>{t('ipick_advantage_item_h3_3')}</h3>
                            <p>{t('ipick_advantage_item_p_3')}</p>
                        </div>
                        <div className='ipick_advantage_item'>
                            <h3>{t('ipick_advantage_item_h3_4')}</h3>
                            <p>{t('ipick_advantage_item_p_4')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IPickPro