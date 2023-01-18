import React from 'react'
import { useInView } from 'react-intersection-observer';

import './service.css'
import SERVICEBG from '../../assets/service.jpg'
import TEAMBG from '../../assets/team.png'
import CUSTOMERBG from '../../assets/customer.jpg'



import imgEn from '../../assets/flow_chart_en.png'
import imgTw from '../../assets/flow_chart_tw.png'
import { useTranslation } from 'react-i18next';

const Service = () => {
    const { t } = useTranslation();
    const data = [
        {
            id: 1,
            image: SERVICEBG,
            title: 'Our Service',
            desc: '雲程能提供給您的服務？'
        },
        {
            id: 2,
            image: TEAMBG,
            title: 'Our Team',
            desc: '為何要找雲程在線？'
        },
        {
            id: 3,
            image: CUSTOMERBG,
            title: 'Our Customer',
            desc: '雲程的合作案例？'
        }
    ]

    const { ref, inView } = useInView({ trackVisibility: true, delay: 100, triggerOnce: true });
    return (
        <div className='service_container'>
            <div className={`hidden ${inView ? 'show' : ' '}`} ref={ref}>
                <div className="container ">
                    <h1 className='service-title'><em>{t('service_title_1')}</em><br></br>{t('service_title_2')}</h1>
                </div>

                <div className="container">
                    <p className='service-desc' >
                        {t('service_desc')}
                    </p>
                </div>
            </div>

            <div className="container service-block-container">
                {
                    data.map(({ id, image, title, desc }) => {
                        return (
                            <div style={{ backgroundImage: `url(${image})` }} key={id} className='portfolio__item '>
                                <div className='service_content'>
                                    <h3>{title}</h3>
                                    <a href='/#'>{desc}</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flowchart_container">
                <img src={
                    localStorage.getItem("i18nextLng") === "en" ? imgEn
                        : localStorage.getItem("i18nextLng") === "tw" ? imgTw : imgEn
                } className="flowchart_image" alt="" />
            </div>
        </div>
    )
}

export default Service