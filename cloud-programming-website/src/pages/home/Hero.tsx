import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    const { ref: visibleRef, inView: elementIsVisible } = useInView();
    return (
        <div className="text-center h-full relative px-52 py-36">
            <h1 className='text-9xl mt-20 font-bold mb-10'>{t('home_hero_title')}</h1>
            <h2 className='text-6xl'>{t('home_hero_desc')}</h2>

            <h3 className='text-2xl mx-8 my-16 tracking-wider px-40 text-gray-300'>
                {t('home_hero_description')}
            </h3>

            <a href='mailto:cloudprogramingservice@gmail.com'>
                <button className={`btn btn-fill glow-on-hover intersection_hidden ${elementIsVisible ? 'intersection_show' : ''}`} ref={visibleRef}>
                    {t('contact_us')}
                </button>
            </a>
        </div>
    )
}

export default Hero
