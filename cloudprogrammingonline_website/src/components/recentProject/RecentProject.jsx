import { t } from 'i18next';
import React from 'react'
import { useInView } from 'react-intersection-observer';
import IMG1 from '../../assets/recentProject1.png'
import IMG2 from '../../assets/recentProject2.png'

import './recentProject.css'
const RecentProject = () => {
    const { ref, inView } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: proj1, inView: inView1 } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: proj2, inView: inView2 } = useInView({ trackVisibility: true, delay: 100 });

    return (
        <section id='about' >
            <div className={`container recet_project_content hidden ${inView ? 'show' : ' '}`} ref={ref}>
                <h2>{t('recet_project_content_h2')}</h2>
                <p>{t('recet_project_content_p')}</p>
            </div>

            {/* project1 */}
            <div className={`container about__container hidden ${inView1 ? 'show' : ' '}`} ref={proj1}>
                <div className="project_card" style={{ backgroundImage: `url(${IMG1})` }}>

                </div>

                <div className='project_desc'>
                    <h2>{t('project_desc_1_h2')}</h2>
                    <p>{t('project_desc_1_p')}</p>
                    <a href="/galaxy-city">
                        <button className="btn btn-fill-white glow-on-hover">{t('learn_more')}</button>
                    </a>
                </div>
            </div>

            {/* project2 */}
            <div className={`container about__container hidden ${inView2 ? 'show' : ' '}`} ref={proj2}>
                <div className='project_desc'>
                    <h2>{t('project_desc_2_h2')}</h2>
                    <p>{t('project_desc_2_p')}</p>
                    <a href="/marketing-system">
                        <button className="btn btn-fill-white glow-on-hover">{t('learn_more')}</button>
                    </a>
                </div>

                <div className="project_card" style={{ backgroundImage: `url(${IMG2})` }}>

                </div>
            </div>

        </section>
    )
}

export default RecentProject