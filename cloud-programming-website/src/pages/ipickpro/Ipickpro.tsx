import IPICK_FEATURE1 from '../../assets/ipick_feature1.png'
import IPICK_FEATURE2 from '../../assets/IPICK_FEATURE2.png'
import IPICK_FEATURE3 from '../../assets/IPICK_FEATURE3.png'
import IPICK_FEATURE4 from '../../assets/IPICK_FEATURE4.png'


import './ipickpro.css'
import { useTranslation } from 'react-i18next'
import YoutubeEmbed from '../../components/youtubeEmbed/YoutubeEmbed'
import { StyledButtonFill } from '../../components/styles/ButtonFill.styled'
import { H0 } from '../../components/styles/Typography.styled'
import { useMediaQuery } from 'react-responsive'
import { StyledButtonStroke } from '../../components/styles/ButtonStroke.styled'

const IPickPro = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ maxWidth: 767 });



    return (
        <div className='relative bg-black text-white px-[10%] pb-20'>
            {/* HERO IPICKPRO */}
            <div className='hero_ipickpro'>
                <H0>iPick Pro</H0>
                <div className='ipick_hero_btn_container'>

                    <a href="https://apps.apple.com/tw/app/ipickpro/id1414137182?l=en">
                        <StyledButtonStroke>
                            Download Now
                        </StyledButtonStroke>
                    </a>
                </div>
            </div>

            {/* VIDEO */}
            <div className={`grid  ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-10'} `}>
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
                <div className={`grid  gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
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