import { t } from 'i18next';
import { useInView } from 'react-intersection-observer';
import IMG1 from '../../assets/recentProject1.png'
import IMG2 from '../../assets/recentProject2.png'
import './recentProject.css'
import { useEffect } from 'react';
import { H2 } from '../../components/styles/H2.styled';
import { P } from '../../components/styles/P.styled';
import { H3 } from '../../components/styles/H3.styled';

const RecentProject = () => {
    const { ref, inView } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: proj1, inView: inView1 } = useInView({ trackVisibility: true, delay: 100 });
    const { ref: proj2, inView: inView2 } = useInView({ trackVisibility: true, delay: 100 });

    useEffect(() => {
        console.log(inView);
    }, [inView])

    return (
        <section id='about'>
            <div className={`px-[10%] py-20 intersection_hidden ${inView ? 'intersection_show' : ''}`} ref={ref}>
                <H2>{t('recet_project_content_h2')}</H2>
                <P>{t('recet_project_content_p')}</P>
            </div>

            {/* project1 */}
            <div className={`px-[10%] flex justify-between my-10 gap-10 intersection_hidden ${inView1 ? 'intersection_show' : ''}`} ref={proj1}>
                <div className="project_card w-[45%]" style={{ backgroundImage: `url(${IMG1})` }}>

                </div>

                <div className='project_desc'>
                    <H3>{t('project_desc_1_h2')}</H3>
                    <P>{t('project_desc_1_p')}</P>
                    <a href="/galaxy-city">
                        <button className="btn btn-fill-white glow-on-hover">{t('learn_more')}</button>
                    </a>
                </div>
            </div>

            {/* project2 */}
            <div className={`px-[10%] flex justify-between my-10 gap-10  intersection_hidden ${inView2 ? 'intersection_show' : ''}`} ref={proj2}>
                <div className='project_desc'>
                    <h2>{t('project_desc_2_h2')}</h2>
                    <p>{t('project_desc_2_p')}</p>
                    <a href="/marketing-system">
                        <button className="btn btn-fill-white glow-on-hover">{t('learn_more')}</button>
                    </a>
                </div>

                <div className="project_card  w-[45%]" style={{ backgroundImage: `url(${IMG2})` }}>

                </div>
            </div>

        </section>
    )
}

export default RecentProject