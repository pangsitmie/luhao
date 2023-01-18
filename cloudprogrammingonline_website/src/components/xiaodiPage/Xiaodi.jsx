import React from 'react'
import { SiAppstore } from 'react-icons/si'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import './xiaodi.css'
import { useInView } from 'react-intersection-observer';

import XIAODI_BLOB_ANIM from '../../assets/blobanimation.svg'
import RESTO_IMG from '../../assets/homieatRestaurant.png'
import HOMIE_SERVICE from '../../assets/homieatService.png'

import XIAODI_01 from '../../assets/xiaodi_01.png'
import XIAODI_02 from '../../assets/xiaodi_02.png'
import XIAODI_03 from '../../assets/xiaodi_03.png'
import XIAODI_04 from '../../assets/xiaodi_04.png'
import XIAODI_05 from '../../assets/xiaodi_05.png'

import DELIVERY_1 from '../../assets/delivery_1.png'
import DELIVERY_2 from '../../assets/delivery_2.png'
import DELIVERY_3 from '../../assets/delivery_3.png'
import DELIVERY_4 from '../../assets/delivery_4.png'
import DELIVERY_5 from '../../assets/delivery_5.png'
import DELIVERY_6 from '../../assets/delivery_6.png'

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const Xiaodi = () => {
    const { t } = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: true,
                    variableWidth: true,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 345,
                settings: {
                    arrows: true,
                    variableWidth: true,
                    swipeToSlide: true,
                }
            }
        ],

    };

    const { ref: visibleRef, inView: elementIsVisible } = useInView();

    return (
        <div className="container">
            <img className='xiaodi_blob' src={XIAODI_BLOB_ANIM} alt="" />
            {/* HERO SECTION */}
            <div className='xiaodi_header_container'>

                <h1 className='xiaodi_hero-title'>{t('xiaodi_hero_title')}</h1>
                <h3 className='xiaodi_description'>
                    {t('xiaodi_description_1')}<br />{t('xiaodi_description_2')}
                </h3>
                <div className='xiaodi_button_container'>
                    <button className={`btn glow-on-hover xiaodi_btn hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                        <a href="https://play.google.com/store/apps/details?id=com.winpro.winproeat.consumer">
                            <li><IoLogoGooglePlaystore className='button_icon' /></li>Play Store
                        </a>
                    </button>
                    <button className={`btn btn-fill-white xiaodi_btn glow-on-hover hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                        <a href="https://apps.apple.com/tw/app/%E5%B0%8F%E5%BC%9F%E5%A4%96%E9%80%81/id1513518654?l=en">
                            <SiAppstore className='button_icon' />App Store
                        </a>
                    </button>
                </div>
            </div>
            {/* DIVVVV */}

            {/* DIV 1 */}
            <div className='xiaodi_order_container'>
                <h3 className='carousel_title'>{t('carousel_title')}</h3>
                <p className='carousel_desc'>{t('carousel_desc')}</p>

                <div className='carousel_container'>
                    <div className='carousel_img'>
                        <div>
                            <Slider {...settings}>
                                <div >
                                    <img src={XIAODI_01} alt="" />
                                </div>
                                <div>
                                    <img src={XIAODI_02} alt="" />
                                </div >
                                <div >
                                    <img src={XIAODI_03} alt="" />
                                </div>
                                <div>
                                    <img src={XIAODI_04} alt="" />
                                </div>
                                <div>
                                    <img src={XIAODI_05} alt="" />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className='carrousel_desc'>
                        <div className='carousel_desc_item'>
                            <h3>{t('carousel_desc_item_h3_1')}</h3>
                            <p>{t('carousel_desc_item_p_1')}</p>
                        </div>
                        <div className='carousel_desc_item'>
                            <h3>{t('carousel_desc_item_h3_2')}</h3>
                            <p>{t('carousel_desc_item_p_2')}</p>
                        </div>
                        <div className='carousel_desc_item'>
                            <h3>{t('carousel_desc_item_h3_3')}</h3>
                            <p>{t('carousel_desc_item_p_3')}</p>
                        </div>
                        <div className='carousel_desc_item'>
                            <h3>{t('carousel_desc_item_h3_4')}</h3>
                            <p>{t('carousel_desc_item_p_4')}</p>
                        </div>
                        <div className='carousel_desc_item'>
                            <h3>{t('carousel_desc_item_h3_5')}</h3>
                            <p>{t('carousel_desc_item_p_5')}</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* DIV 2 */}
            <div className='xiaodi_order_container'>
                <h3 className='carousel_title'>{t('carousel_title_2')}</h3>
                <p className='carousel_desc'>{t('carousel_desc_2')}</p>

                <div className='carousel_container_3'>
                    <div className='carrousel_desc'>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_1')}</h3>
                            <p>{t('carousel_desc_item2_p_1')}</p>
                        </div>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_2')}</h3>
                            <p>{t('carousel_desc_item2_p_2')}</p>
                        </div>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_3')}</h3>
                            <p>{t('carousel_desc_item2_p_3')}</p>
                        </div>
                    </div>

                    <div className='carousel_img_2'>
                        <Slider {...settings}>
                            <div >
                                <img src={DELIVERY_1} alt="" />
                            </div>
                            <div>
                                <img src={DELIVERY_2} alt="" />
                            </div >
                            <div >
                                <img src={DELIVERY_3} alt="" />
                            </div>
                            <div>
                                <img src={DELIVERY_4} alt="" />
                            </div>
                            <div>
                                <img src={DELIVERY_5} alt="" />
                            </div>
                            <div>
                                <img src={DELIVERY_6} alt="" />
                            </div>
                        </Slider>

                    </div>


                    <div className='carrousel_desc'>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_4')}</h3>
                            <p>{t('carousel_desc_item2_p_4')}</p>
                        </div>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_5')}</h3>
                            <p>{t('carousel_desc_item2_p_5')}</p>
                        </div>
                        <div className='carousel_desc_item2'>
                            <h3>{t('carousel_desc_item2_h3_6')}</h3>
                            <p>{t('carousel_desc_item2_p_6')}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* DIV3 */}
            <div className="resto_container">
                <h3 className='carousel_title'>{t('resto_title')}</h3>
                <div className='resto_content'>
                    <div>
                        <img className='resto_img' src={RESTO_IMG} alt="" />
                    </div>
                    <div className='resto_content_desc'>
                        <p>
                            {t('resto_content_desc_1')}
                            <br /><br />
                            {t('resto_content_desc_2')}
                            <br /><br />
                            {t('resto_content_desc_3')}
                        </p>
                    </div>
                </div>
            </div>

            {/* DIV4 */}
            <div className='delivery_container'>
                <h3 className='delivery_title'>{t('delivery_title')}</h3>
                <p className='delivery_desc'>
                    {t('delivery_desc')}
                </p>
                <div className='homie_img_container'>
                    <img className='homie_img' src={HOMIE_SERVICE} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Xiaodi